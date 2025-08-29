import { colors } from "../Data";
import type { IProduct } from "../Interfaces";
import { txtSlicer } from "../utils";
import Image from "./Image";
import Bottom from "./UI/Bottom";
import CircleColor from "./UI/CircleColor";

interface IProps {
    product: IProduct
}
const ProductCard = ({ product }: IProps) => {
    const renderColorList = product.colors.map(
        color => <CircleColor key={color} color={color}
        />)
    return <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md  p-2 flex flex-col ">
        <img />
        <Image imageUrl={product.imageURL}
            alt={"Product Image"}
            className="rounded-md"
        />
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500 break-words">
            {txtSlicer(product.description)}
        </p>
        <div className="flex items-center my-4 space-x-2">
            {renderColorList}
        </div>
        <div className="flex items-center justify-between">
            <span>{product.price}$</span>
            <Image imageUrl={product.category.imageURL}
                alt={"Category Image"}
                className="w-10 h-10 rounded-full object-center" />
        </div>
        <div className="flex items-center justify-between space-x-2 mt-5">
            <Bottom className="bg-indigo-500 p-2 " width="w-full">Edit</Bottom>
            <Bottom className="bg-red-500 p-2 " width="w-full">Delete</Bottom>
        </div>

    </div>;
};

export default ProductCard;