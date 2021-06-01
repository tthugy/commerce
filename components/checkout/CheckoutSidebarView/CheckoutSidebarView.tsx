import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import s from './CheckoutSidebarView.module.css'
import CartItem from '@components/cart/CartItem'
import { Button } from '@components/ui'
import { UserNav } from '@components/common'
import { useUI } from '@components/ui/context'
import {
  Bag,
  Cross,
  Check,
  MapPin,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'

const CheckoutSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()

  const error = null
  const success = null

  return (
    <div
      className={cn(s.root, {
        [s.empty]: error || success || isLoading || isEmpty,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={() => setSidebarView('CART_VIEW')}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 flex items-center focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="ml-2 text-accent-7 text-xs hover:text-gray-500">
                Back
              </span>
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>

      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
                Checkout
              </h2>
            </Link>

            {/* Payment Method */}
            {/* Only available with checkout set to true - Meaning that the provider does offer checkout functionality. */}
            <div
              onClick={() => setSidebarView('PAYMENT_VIEW')}
              className="border border-accent-2 px-6 py-5 mb-4 text-center flex items-center cursor-pointer hover:border-accent-4"
            >
              <div className="flex flex-1 items-center">
                <CreditCard className="w-5 flex" />
                <span className="ml-5 text-sm text-center font-medium">
                  Add Payment Method
                </span>
                {/* <span>VISA #### #### #### 2345</span> */}
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>

            {/* Shipping Address */}
            {/* Only available with checkout set to true - Meaning that the provider does offer checkout functionality. */}
            <div
              onClick={() => setSidebarView('SHIPPING_VIEW')}
              className="border border-accent-2 px-6 py-5 mb-4 text-center flex items-center cursor-pointer hover:border-accent-4"
            >
              <div className="flex flex-1 items-center">
                <MapPin className="w-5 flex" />
                <span className="ml-5 text-sm text-center font-medium">
                  Add Shipping Address
                </span>
                {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>

            <ul className="py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                  variant="display"
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 shadow-outline-normal text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div>
              {/* Once data is correcly filled */}
              {/* <Button Component="a" width="100%">
                Confirm Purchase
              </Button> */}
              <Button Component="a" width="100%" variant="ghost" disabled>
                Continue
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CheckoutSidebarView
