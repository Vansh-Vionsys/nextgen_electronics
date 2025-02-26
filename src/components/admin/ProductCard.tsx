"use client";
import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
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
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";

const categories = [
  "Mobile & Accessories",
  "Gaming & Entertainment",
  "Cameras & Accessories",
  "Computers & Laptops",
  "Home Appliances",
] as const;

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  ratings: number;
  images: { url: string; public_id: string }[];
}

const ProductCard = () => {
  const { getAllProducts, getAllProductsError, getAllProductsLoading } =
    useGetAllProducts();
  const { deleteProduct, isDeletePending } = useDeleteProductById();
  const { updateProduct, isPendingUpdate } = useUpdateProduct();

  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      setFormData({});
      setNewImages([]);
      setImagePreviews([]);
      setSelectedProduct(null);
    }
  }, [open]);

  if (getAllProductsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-72 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (getAllProductsError) {
    return (
      <p className="text-center text-red-500 text-lg">
        Error fetching products
      </p>
    );
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setDeletingProductId(id);
      deleteProduct(id, { onSettled: () => setDeletingProductId(null) });
    }
  };

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setImagePreviews(product.images?.map((img) => img.url) || []);
    setOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file.size <= 10 * 1024 * 1024
    );
    if (files.length) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setNewImages((prev) => [...prev, ...files]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const isExistingImage = index < (selectedProduct?.images.length || 0);
    if (isExistingImage) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images?.filter((_, i) => i !== index),
      }));
    } else {
      const newImageIndex = index - (selectedProduct?.images.length || 0);
      setNewImages((prev) => prev.filter((_, i) => i !== newImageIndex));
    }
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const updatedFormData = new FormData();
    updatedFormData.append("name", formData.name || "");
    updatedFormData.append("description", formData.description || "");
    updatedFormData.append("price", String(formData.price || 0));
    updatedFormData.append("stock", String(formData.stock || 0));
    updatedFormData.append("category", formData.category || "");
    updatedFormData.append("ratings", String(formData.ratings || 0));

    newImages.forEach((file) => updatedFormData.append("images", file));
    const existingImageIds = formData.images?.map((img) => img.public_id) || [];
    updatedFormData.append(
      "existingImageIds",
      JSON.stringify(existingImageIds)
    );

    updateProduct(
      { id: selectedProduct._id, data: updatedFormData },
      { onSuccess: () => setOpen(false) }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {getAllProducts?.map((product: Product) => (
        <Card
          key={product._id}
          className="dark:bg-slate-900 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <CardHeader className="p-0">
            <AspectRatio ratio={4 / 3}>
              <img
                src={product.images?.[0]?.url || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold dark:text-white text-gray-900">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-lg font-bold dark:text-white text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-sm text-yellow-500">
                ⭐ {product.ratings} ({product.stock} left)
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex justify-between gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full dark:border-gray-600 dark:text-white"
                  onClick={() => handleUpdateClick(product)}
                >
                  Update
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] bg-white dark:bg-gray-900 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Update Product
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] p-6">
                  <form onSubmit={handleUpdateProduct} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category || ""}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: value,
                            }))
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
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              price: parseFloat(e.target.value),
                            }))
                          }
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              stock: parseInt(e.target.value),
                            }))
                          }
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ratings">Ratings</Label>
                        <Input
                          id="ratings"
                          type="number"
                          value={formData.ratings || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              ratings: parseFloat(e.target.value),
                            }))
                          }
                          min="0"
                          max="5"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Product Images</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4">
                        {imagePreviews.map((img, index) => (
                          <div key={index} className="relative group">
                            <AspectRatio ratio={1 / 1}>
                              <img
                                src={img}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </AspectRatio>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Add Images (Max 10MB)
                            </p>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isPendingUpdate}
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                      >
                        {isPendingUpdate ? "Updating..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </ScrollArea>
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
