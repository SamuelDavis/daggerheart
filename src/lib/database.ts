import * as v from 'valibot'

const storeNames = ['characters'] as const
type StoreName = (typeof storeNames)[number]

export class KeyTaken extends Error {
  readonly key: string

  constructor(key: string) {
    super(`“${key}” already exists`)
    this.key = key
  }
}

const settle = <T>(request: IDBRequest<T>) =>
  new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

const complete = (transaction: IDBTransaction) =>
  new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })

export class DatabaseBlocked extends Error {
  constructor() {
    super('Saved data is locked by another open copy of this app. Close other tabs or windows of it, then reload.')
  }
}

const connection = (() => {
  let opened: Promise<IDBDatabase> | undefined
  const forget = () => {
    opened = undefined
  }
  return () => {
    opened ??= new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('daggerheart', 1)
      request.onupgradeneeded = () => {
        for (const name of storeNames) request.result.createObjectStore(name, { keyPath: 'name' })
      }
      request.onblocked = () => reject(new DatabaseBlocked())
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const database = request.result
        database.onversionchange = () => {
          database.close()
          forget()
        }
        database.onclose = forget
        resolve(database)
      }
    }).catch((error: unknown) => {
      forget()
      throw error
    })
    return opened
  }
})()

const transact = async <T>(
  storeName: StoreName,
  mode: IDBTransactionMode,
  work: (store: IDBObjectStore) => Promise<T>,
) => {
  const transaction = (await connection()).transaction(storeName, mode)
  const [result] = await Promise.all([work(transaction.objectStore(storeName)), complete(transaction)])
  return result
}

const isConstraintError = (error: unknown) =>
  error instanceof DOMException && error.name === 'ConstraintError'

export const objectStore = <Schema extends v.GenericSchema<unknown, { name: string }>>(
  storeName: StoreName,
  schema: Schema,
) => {
  type Record = v.InferOutput<Schema>
  const parse = (raw: unknown): Record => v.parse(schema, raw)

  const add = async (record: Record) => {
    try {
      await transact(storeName, 'readwrite', (store) => settle(store.add(record)))
    } catch (error) {
      throw isConstraintError(error) ? new KeyTaken(record.name) : error
    }
  }

  return {
    all: () =>
      transact(storeName, 'readonly', (store) => settle(store.getAll())).then((rows) => rows.map(parse)),
    get: (name: string) =>
      transact(storeName, 'readonly', (store) => settle(store.get(name))).then((row) =>
        row === undefined ? undefined : parse(row),
      ),
    keys: () =>
      transact(storeName, 'readonly', (store) => settle(store.getAllKeys())).then((keys) => keys.map(String)),
    add,
    put: (record: Record) => transact(storeName, 'readwrite', (store) => settle(store.put(record))).then(() => {}),
    delete: (name: string) => transact(storeName, 'readwrite', (store) => settle(store.delete(name))),
    replace: async (previousName: string, record: Record) => {
      if (previousName === record.name) {
        await transact(storeName, 'readwrite', (store) => settle(store.put(record)))
        return
      }
      try {
        await transact(storeName, 'readwrite', async (store) => {
          await settle(store.add(record))
          await settle(store.delete(previousName))
        })
      } catch (error) {
        throw isConstraintError(error) ? new KeyTaken(record.name) : error
      }
    },
  }
}

export const requestPersistentStorage = () => navigator.storage?.persist?.()
