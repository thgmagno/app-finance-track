interface Props {
  title: string
  children?: JSX.Element
}

export function PageTitle({ title, children }: Props) {
  return (
    <div className="border-b bg-medium">
      <div className="mx-auto flex max-w-5xl justify-between px-2 py-8 text-xl font-medium tracking-wide md:px-0">
        <h1>{title}</h1>
        {children && children}
      </div>
    </div>
  )
}
