import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addToCart,
  removeFromCart,
  removeOne,
} from '@/redux/features/cart/cartSlice';

export default function Cart() {
  const { products, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle className='text-xl'>Product Cart</SheetTitle>
          <h1 className="text-lg font-medium">Total: {total.toFixed(2)}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {products.map((product) => (
            <div
              className="border h-44 p-3 flex justify-between rounded-md"
              key={product.name}
            >
              <div className="border-r pr-3 shrink-0">
                <img src={product?.image} alt="" className="h-[80%]" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-lg self-start">{product?.name}</h1>
                <p className='text-sm'>Quantity: {product.quantity}</p>
                <p className="text-sm font-medium">
                  Total Price:  ${(product.price * product.quantity!).toFixed(2)}{' '}
                 
                </p>
              </div>
              <div className="border-l pl-3 flex flex-col justify-between">
                <Button onClick={() => dispatch(addToCart(product))}>
                  <HiOutlinePlus size="16" />
                </Button>
                <Button onClick={() => dispatch(removeOne(product))}>
                  <HiMinus size="16" />
                </Button>
                <Button
                  onClick={() => dispatch(removeFromCart(product))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="16" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
