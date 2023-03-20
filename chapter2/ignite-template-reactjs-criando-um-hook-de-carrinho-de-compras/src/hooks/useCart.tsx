import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { Product, Stock } from '../types'

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const addProduct = async (productId: number) => {
    try {
      const productIndex = cart.findIndex((product) => product.id === productId)

      if (productIndex < 0) {
        const response = await api.get(`stock/${productId}`)

        const { amount } = response.data

        if (amount >= 1) {
          const { data } = await api.get(`products/${productId}`)

          setCart((state) => {
            const newItem = { ...data, amount: 1 }

            const newState = [...state, newItem]

            localStorage.setItem('@RocketShoes:cart', JSON.stringify(newState))

            return newState as Product[]
          })
        } else {
          toast.error('Quantidade solicitada fora de estoque')
        }
      } else {
        const cartProduct = cart[productIndex]

        await updateProductAmount({ productId, amount: cartProduct.amount + 1 })
      }
    } catch {
      toast.error('Erro na adição do produto')
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const productIndex = cart.findIndex((product) => product.id === productId)

      if (productIndex < 0) throw Error()

      setCart((state) => {
        state.splice(productIndex, 1)

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(state))

        return [...state]
      })
    } catch {
      toast.error('Erro na remoção do produto')
    }
  }

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount > 0) {
        const productIndex = cart.findIndex(
          (product) => product.id === productId
        )

        const { data } = await api.get(`stock/${productId}`)

        if (data.amount >= amount) {
          setCart((state) => {
            state[productIndex].amount = amount

            localStorage.setItem('@RocketShoes:cart', JSON.stringify(state))

            return [...state]
          })
        } else {
          toast.error('Quantidade solicitada fora de estoque')
        }
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
