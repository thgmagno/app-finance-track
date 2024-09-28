export function ErrorMessage({ message }: { message?: string | string[] }) {
  return message ? (
    <div className="text-sm text-muted-foreground">
      <p>{message}</p>
    </div>
  ) : null
}
