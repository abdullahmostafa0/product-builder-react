import { v4 as uuid } from "uuid";

import { useState, type ChangeEvent, type ChangeEventHandler, type MouseEvent } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Model from './components/UI/Model'
import { categories, colors, formInputsList, productList } from './Data'
import Bottom from './components/UI/Bottom'
import Input from './components/UI/Input'
import type { IProduct } from './Interfaces'
import { productValidation } from './validation'
import ErrorMesg from './components/UI/ErrorMesg'
import CircleColor from './components/UI/CircleColor'
import Select from "./components/UI/Select";

function App() {
  const defaultProduct = {
    title: '',
    description: '',
    imageURL: '',
    price: "",
    colors: [],
    category: { name: '', imageURL: '' }
  }
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(
    defaultProduct
  )
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: ''
  })
  const [tempColors, setTempColors] = useState<string[]>([])
  const [selected, setSelected] = useState(categories[2])


  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value

    })
    setErrors({
      ...errors,
      [event.target.name]: ''
    })
    console.log(errors);
  }
  const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const errors = productValidation({ title: product.title, description: product.description, imageURL: product.imageURL, price: product.price })
    const errMesg = Object.values(errors).every(mesg => mesg === "")
    if (!errMesg) {
      setErrors(errors)
      return
    }
    setProducts((prev)=>[...prev, {...product, id:uuid(), colors: tempColors, category:selected}])
    console.log(products);
    setProduct(defaultProduct)
    setTempColors([])
    close()
  }

  const onCancel = () => {
    setProduct(defaultProduct)
    close()
  }

  const renderFormInputList = formInputsList.map(input => (
    <div className='flex flex-col ' key={input.id}>
      <label htmlFor={input.id} className='mb-[2px] text-sm text-gray-700'>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMesg message={errors[input.name]} />
    </div>
  ))

  const productRenderList = products.map((product) => (
    <ProductCard key={product.id} product={product} />))

  const renderColorList = colors.map(color => <CircleColor key={color} color={color} 
  onClick={()=>{
    if(tempColors.includes(color)) {
      const filteredColors = tempColors.filter(c=>c!==color)
      setTempColors(filteredColors)
      return
    }
    setTempColors((prev)=>[...prev,color])}}/>)

  return (
    <>
      <div className="container mx-auto p-4">
        <Bottom className='bg-indigo-500 p-2
        hover:bg-indigo-800 cursor-pointer' 
        onClick={open} >Submit</Bottom>

        <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 rounded-md">
          {productRenderList}
        </div>
        <Model isOpen={isOpen} close={close} title={"Add New Product"}>
          <div className='space-y-3'>
            {renderFormInputList}
            <div className="flex items-center my-4 space-x-2">
              {renderColorList}
            </div>
            <div className="flex items-center my-4 space-x-2">
              {tempColors.map(color=> (
                <span key={color} 
                className='p-1 mr-1 mb-1 rounded-md text-white'
                style={{ backgroundColor: color }}>{color} </span>
              ))}
            </div>
            <Select selected={selected} setSelected={setSelected}/>
            <div className="flex items-center justify-between space-x-3 ">
              <Bottom className='bg-indigo-500 p-2 hover:bg-indigo-800 cursor-pointer' onClick={submitHandler}>Submit</Bottom>
              <Bottom className='bg-red-500 p-2 hover:bg-red-700 cursor-pointer' onClick={onCancel} >Cancel</Bottom>
            </div>
          </div>


        </Model>
      </div>

    </>
  )
}

export default App
