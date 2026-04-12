// ©2026 Application or Website Name Mahin Ltd develop by (Tanvir)
function LoadingSpinner({ size = 'h-4 w-4' }) {
  return (
    <span
      className={`${size} inline-block animate-spin rounded-full border-2 border-blue-500 border-t-transparent`}
      aria-hidden="true"
    />
  )
}

export default LoadingSpinner
