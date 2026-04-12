// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
function getStatusStyles(status) {
  const normalized = String(status || 'pending').toLowerCase()

  if (['delivered', 'sent', 'success'].includes(normalized)) {
    return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
  }

  if (['failed', 'error', 'undelivered'].includes(normalized)) {
    return 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
  }

  return 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
}

function MessageDetailsModal({ isOpen, onClose, onRetry, messageData }) {
  if (!isOpen || !messageData) {
    return null
  }

  const statusValue = String(messageData?.status || 'pending').toLowerCase()
  const directionValue = String(messageData?.direction || messageData?.type || 'sent').toLowerCase()
  const isReceived = ['received', 'inbound', 'incoming'].includes(directionValue)
  const isFailed = ['failed', 'error', 'undelivered'].includes(statusValue)
  const numberValue = isReceived
    ? messageData?.from || messageData?.sender || messageData?.phoneNumber || 'Unknown sender'
    : messageData?.to || messageData?.phoneNumber || 'Unknown number'
  const dateValue = messageData?.createdAt || messageData?.timestamp
  const bodyValue =
    messageData?.messageBody ||
    messageData?.message_body ||
    messageData?.message ||
    messageData?.body ||
    messageData?.text ||
    '(No content)'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl shadow-blue-950/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Message Details</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{isReceived ? 'Received Message' : 'Sent Message'}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</p>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(messageData?.status)}`}>
              {messageData?.status || 'Pending'}
            </span>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Direction</p>
            <p className="mt-2 text-base font-medium text-slate-100">
              {isReceived ? 'Received' : 'Sent'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Number</p>
            <p className="mt-2 break-words text-base font-medium text-white">{numberValue}</p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Date &amp; Time</p>
            <p className="mt-2 text-base font-medium text-slate-100">
              {dateValue ? new Date(dateValue).toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>

        {isFailed ? (
          <div className="mt-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-rose-300">Delivery Alert</p>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-rose-100">
              ডেলিভারি ফেল করেছে। আপনার একাউন্টে পর্যাপ্ত এসএমএস প্যাকেজ না থাকায় ফেল করেছে। আপনার যে সিমের ভেতরে এসএমএস প্যাকেজ আছে সেটা সিলেক্ট করে আবার পুনরায় চেষ্টা করুন।
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-rose-400/50 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onRetry) {
                    onRetry(messageData)
                  }
                  onClose()
                }}
                className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
              >
                Retry
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Message Body</p>
          <div className="mt-3 max-h-[60vh] overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-slate-950/30 p-4 text-sm leading-6 text-slate-100">
            {bodyValue}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageDetailsModal
