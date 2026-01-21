export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 overflow-hidden bg-transparent">
      <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-loading" />
    </div>
  )
}
