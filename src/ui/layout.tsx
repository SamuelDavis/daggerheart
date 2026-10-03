import { children, For, Show, splitProps, type JSX } from 'solid-js'
import { classes } from './classes'
import { Heading, Subordinate } from './Heading'
import './layout.css'

type Titled = {
  heading: JSX.Element
  actions?: JSX.Element
}

type Props<Element extends HTMLElement, Extra = {}> = JSX.HTMLAttributes<Element> & Extra

function Header(props: Titled) {
  return (
    <Show when={props.actions} fallback={<Heading>{props.heading}</Heading>}>
      <header class="titled">
        <Heading>{props.heading}</Heading>
        <Toolbar data-print="hidden">{props.actions}</Toolbar>
      </header>
    </Show>
  )
}

const titledKeys = ['heading', 'actions', 'children', 'class'] as const

export function Page(props: Props<HTMLElement, Titled>) {
  const [own, rest] = splitProps(props, titledKeys)
  return (
    <main id="main" {...rest} class={classes('page center stack', own.class)}>
      <Header heading={own.heading} actions={own.actions} />
      <Subordinate>{own.children}</Subordinate>
    </main>
  )
}

export function Section(props: Props<HTMLElement, Titled>) {
  const [own, rest] = splitProps(props, titledKeys)
  return (
    <section {...rest} class={classes('stack', own.class)}>
      <Header heading={own.heading} actions={own.actions} />
      <Subordinate>{own.children}</Subordinate>
    </section>
  )
}

export function Card(props: Props<HTMLElement, Titled>) {
  const [own, rest] = splitProps(props, titledKeys)
  return (
    <article {...rest} class={classes('card stack', own.class)}>
      <Header heading={own.heading} actions={own.actions} />
      <Subordinate>{own.children}</Subordinate>
    </article>
  )
}

export function List(props: Props<HTMLUListElement>) {
  return <ul role="list" {...props} class={classes('stack', props.class)} />
}

export function OrderedList(props: Props<HTMLOListElement>) {
  return <ol role="list" {...props} class={classes('stack', props.class)} />
}

export function Tags(props: Props<HTMLUListElement>) {
  return <ul role="list" {...props} class={classes('cluster', props.class)} />
}

export function Grid(props: Props<HTMLUListElement>) {
  return <ul role="list" {...props} class={classes('grid', props.class)} />
}

export function Split(props: Props<HTMLDivElement>) {
  return <div {...props} class={classes('split', props.class)} />
}

export function Toolbar(props: Props<HTMLMenuElement>) {
  const [own, rest] = splitProps(props, ['children', 'class'])
  const items = children(() => own.children)
  return (
    <menu {...rest} class={classes('cluster', own.class)}>
      <For each={items.toArray()}>{(item) => <li>{item}</li>}</For>
    </menu>
  )
}

export function DescriptionList(props: Props<HTMLDListElement>) {
  return <dl {...props} class={classes('pairs', props.class)} />
}
