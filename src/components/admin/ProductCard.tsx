"use client";
import React, { useState } from "react";
import useGetAllProducts from "@/features/productMutations/useGetAllProducts";
import useDeleteProductById from "@/features/productMutations/useDeleteProductById";
import useUpdateProduct from "@/features/productMutations/useUpdateProduct";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const categories = [
  "Mobile & Accessories",
  "Gaming & Entertainment",
  "Cameras & Accessories",
  "Computers & Laptops",
  "Home Appliances",
];

const ProductCard = () => {
  const { getAllProducts, getAllProductsError, getAllProductsLoading } =
    useGetAllProducts();
  const { deleteProduct, isDeletePending } = useDeleteProductById();
  const { updateProduct, isPendingUpdate } = useUpdateProduct();

  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  if (getAllProductsLoading)
    return <p className="text-center text-lg">Loading...</p>;
  if (getAllProductsError)
    return <p className="text-center text-red-500">Error fetching products</p>;

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setDeletingProductId(id);
      deleteProduct(id, { onSettled: () => setDeletingProductId(null) });
    }
  };

  const handleUpdateClick = (product: any) => {
    setSelectedProduct(product);
    setImagePreview(product.images?.map((img: any) => img.url) || []);
    setOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setNewImages(files);
      setImagePreview([
        ...imagePreview,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeImage = (index: number) => {
    setImagePreview(imagePreview.filter((_, i) => i !== index));
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("description", selectedProduct.description);
    formData.append("price", selectedProduct.price);
    formData.append("stock", selectedProduct.stock);
    formData.append("category", selectedProduct.category);
    formData.append("ratings", selectedProduct.ratings);

    newImages.forEach((file) => formData.append("images", file));

    updateProduct({ id: selectedProduct._id, data: formData });

    setNewImages([]);
    setImagePreview([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {getAllProducts?.map((product: any) => (
        <div
          key={product._id}
          className="rounded-xl shadow-lg bg-white overflow-hidden"
        >
          <img
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-lg font-bold">₹{product.price}</span>
              <span className="text-sm text-yellow-500">
                ⭐ {product.ratings} ({product.stock} left)
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mr-2"
                    onClick={() => handleUpdateClick(product)}
                  >
                    Update
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateProduct} className="space-y-4">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={selectedProduct?.name || ""}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                      required
                    />

                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={selectedProduct?.description || ""}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          description: e.target.value,
                        })
                      }
                      required
                    />

                    <Label htmlFor="price">Price</Label>
                    <Input
                      type="number"
                      id="price"
                      value={selectedProduct?.price || ""}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: e.target.value,
                        })
                      }
                      required
                    />

                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      type="number"
                      id="stock"
                      value={selectedProduct?.stock || ""}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock: e.target.value,
                        })
                      }
                      required
                    />

                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={selectedProduct?.category}
                      onValueChange={(value) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Label>Product Images</Label>
                    <div className="flex space-x-2">
                      {imagePreview.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2"
                    />

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isPendingUpdate}>
                        {isPendingUpdate ? "Updating..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => handleDeleteProduct(product._id)}
                variant="destructive"
                className="w-full"
                disabled={deletingProductId === product._id}
              >
                {deletingProductId === product._id ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
