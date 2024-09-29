export function ErrorMessage({ message }: { message?: string | string[] }) {
  return message ? (
    <div className="text-sm text-muted text-orange-300">
      <p>{message}</p>
    </div>
  ) : null
}
