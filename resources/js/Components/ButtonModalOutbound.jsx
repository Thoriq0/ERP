import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import Select from "react-select";
import { Textarea } from "flowbite-react";

export function ButtonModalOutbound({ userRole, dataStocks, usr}) {
  // State untuk form
  const [values, setValues] = useState({
    product: null,
    qty: "",
    receiver: "",
    address: "",
    pic: null,
    image: null,
    document: null
  });
  
  // Untuk Disabled Feild
  const [supplierName, setSupplierName] = useState("");
  const [picName, setPicName] = useState("");

  // State untuk error
  const [errors, setErrors] = useState({});

  // Stock Error
  const [stockError, setStockError] = useState("");

  // SET DROPDOWN SEARCH  
  const productOptions = dataStocks.map(stock => ({
    value: stock.product.id, 
    label: `${stock.product.name} - ${stock.qty} QTY`
  }));
  
  const picOptions = usr.map(user => ({
    value: user.id, 
    label: user.name 
  }));

  // Handle perubahan input
  function handleChange(e) {
    const { name, value, type, files } = e.target;

    // Cek khusus jika sedang input jumlah qty
    if (name === "qty" && values.product) {
      const selectedStock = dataStocks.find(stock => stock.product.id === values.product.value);
      const inputQty = parseInt(value || 0, 10);

      if (inputQty > selectedStock.qty) {
        setStockError("QTY Exceeds Stock, Data cannot be generated");
      } else {
        setStockError("");
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? Array.from(files) : value,
    }));

  }
  
  function handleSelectChangeUsr(name, selectedOption) {
    const selectedPic = usr.find((user) => user.id === selectedOption?.value);
    
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
    setPicName(selectedPic?.name || "");
  }

  function handleSelectChange(name, selectedOption) {
    const selectedStock = dataStocks.find((stock) => stock.product.id === selectedOption?.value);
    
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
    setSupplierName(selectedStock?.product?.supplier?.name || "");
  }

  // Handle submit
  function handleSubmit(e) {
    if (stockError) {
      toast.error("Can't submit: QTY exceeds stock!");
      return;
    }
    
    e.preventDefault();
    setErrors({}); // Reset error sebelum submit

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/outbound",
      wrhs: "/wrhs/outbound",
    };
  
    const userPath = rolePaths[userRole];

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if ((key === "image" || key === "document") && value) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i]); // Kirim multiple file
        }
      } else {
        formData.append(key, value?.value || value);
      }
    });

    // Kirim data ke backend
    router.post(
      userPath,
      formData,
      {
        ...values,
        product: values.product?.value || "", 
        pic: values.pic?.value || "",
      },
      {
        forceFormData: true, 
        onSuccess: () => {
          // toast.success("Product saved successfully! 🎉", {
          //   duration: 5000,
          // });
          setValues({
            product: null,
            qty: "",
            receiver: "",
            pic: null,
            image: null,
            document: null
          });
          setSupplierName("");
          setCategoryName("");
        },
        onError: (err) => {
          setErrors(err); 
          const errorMessage = err.message || "An error occurred!";
          toast.error(`Failed to store the product!, ${errorMessage}`, { duration: 5000 });
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Create</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Outgoing Product Data</DialogTitle>
          <DialogDescription>
            Enter the outgoing product data, then click Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="product" value="Product" />
            <Select
              id="product"
              options={productOptions}
              isSearchable={true}
              placeholder="Select Product"
              value={values.product}
              onChange={(selected) => handleSelectChange("product", selected)}
              className="mt-1"
            />
            {errors.product && <p className="text-red-500 text-sm">{errors.product}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="supplierName" value="Name Supplier" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={supplierName}
              disabled
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="qty" value="QTY Out" />
            {stockError && <p className="text-red-500 text-sm mb-1">{stockError}</p>}
            <TextInput
              id="qty"
              type="number"
              name="qty"
              className="mt-1 block w-full"
              placeholder="Qty out"
              value={values.qty}
              onChange={handleChange}
            />
            {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
          </div>
          
          <div className="mt-4">
            <InputLabel htmlFor="receiver" value="Receiver" />
            <TextInput
              id="receiver"
              type="text"
              name="receiver"
              className="mt-1 block w-full"
              placeholder="Name Receiver"
              value={values.receiver}
              onChange={handleChange}
            />
            {errors.receiver && <p className="text-red-500 text-sm">{errors.receiver}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <Textarea
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full"
              placeholder="Address Receiver"
              value={values.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.alamat}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="pic" value="Person in charge of Product" />
            <Select
              id="pic"
              options={picOptions}
              isSearchable={true}
              placeholder="Select PIC"
              value={values.pic} 
              onChange={(selected) => handleSelectChangeUsr("pic", selected)} 
              className="mt-1"
            />
            {errors.pic && <p className="text-red-500 text-sm">{errors.pic}</p>}
          </div>


          <div className="mt-4">
            <InputLabel htmlFor="image" value="Attach Photo" />
            <input
              id="image"
              type="file"
              accept="image/*"
              multiple
              name="image"
              className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleChange}
            />
            <span className="text-gray-500 text-xs">- Maximum photo size: 2 MB (JPEG, PNG, JPG)</span>
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="document" value="Document (PDF)" />
            <input
              id="document"
              type="file"
              accept="application/pdf"
              multiple
              name="document"
              className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleChange}
            />
            <span className="text-gray-500 text-xs">- Maximum document size: 5 MB (PDF)</span>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
