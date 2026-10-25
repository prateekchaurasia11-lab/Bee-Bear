'use client'

let pending: Promise<void> | undefined

// No third-party request occurs on page render. The checkout button calls this.
export function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve()
  if (pending) return pending
  pending = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    const timeout = window.setTimeout(() => fail(), 15000)
    function fail() {
      window.clearTimeout(timeout)
      script.remove()
      pending = undefined
      reject(new Error('Payment checkout could not load. Please try again.'))
    }
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onerror = fail
    script.onload = () => {
      window.clearTimeout(timeout)
      if (window.Razorpay) resolve()
      else fail()
    }
    document.head.appendChild(script)
  })
  return pending
}
