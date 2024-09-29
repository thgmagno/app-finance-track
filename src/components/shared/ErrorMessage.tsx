export function ErrorMessage({ message }: { message?: string | string[] }) {
  return message ? (
    <div className="text-sm text-muted text-red-600">
      <p>{message}</p>
    </div>
  ) : null
}
