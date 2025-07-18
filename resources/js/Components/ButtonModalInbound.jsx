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
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import Select from "react-select";

export function ButtonModalInbound({ userRole, productData, roleName, user }) {
  const { flash } = usePage().props;

  const nameRole = roleName;
  // State untuk form
  const [values, setValues] = useState({
    product: null,
    qty: "",
    pic: null,
    created: nameRole,
    image: null,
    document: null,
  });

  const [open, setOpen] = useState(false);

  // Untuk Disabled Feild
  const [supplierName, setSupplierName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  // State untuk error
  const [errors, setErrors] = useState({});

  // SET DROPDOWN SEARCH  
  const productOptions = productData.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  // SET DROPDOWN SEARCH USER/PIC
  const picOptions = user.map((usr) => ({
    value: usr.id,
    label: usr.name,
  }));

  // Handle perubahan input product
  function handleSelectChange(name, selectedOption) {
    const selectedProduct = productData.find((prod) => prod.id === selectedOption?.value);
    
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
    setSupplierName(selectedProduct?.supplier?.name || "");
    setCategoryName(selectedProduct?.category?.name || "");
  }

  // Handle perubahan input user
  function handleSelectUser(name, selectedOption) {
    const selectedUser = user.find((usr) => usr.id === selectedOption?.value);
    
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  }

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    // Ambil maksimal 4 file
    // const selectedFiles = Array.from(files).slice(0, 4);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? Array.from(files) : value,
    }));

  }

  useEffect(() => {
    if (flash.success) {
      setValues({
        product: null,
        qty: "",
        pic: null,
        image: null,
        document: null,
        created: nameRole,
      });
      setSupplierName("");
      setCategoryName("");
      setOpen(false);
      // toast.success(flash.success, { duration: 5000 });
    }

    // if (flash.error) {
    //   toast.error(flash.error, { duration: 5000 });
    // }
  }, [flash]);

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({}); // Reset error sebelum submit

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/inbound",
      wrhs: "/wrhs/inbound",
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
          // toast.success("Inbound berhasil disimpan! 🎉", { duration: 5000 });
          setValues({ product: null, qty: "", pic: null, image: null });
          setSupplierName("");
          setCategoryName("");
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Failed to save Inbound! ❌", { duration: 5000 });
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Create</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
      <DialogHeader>
        <DialogTitle>Incoming Product Data</DialogTitle>
        <DialogDescription>Enter the incoming product data, then click Save.</DialogDescription>
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
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="qty" value="Quantity Product" />
            <TextInput
              id="qty"
              type="number"
              name="qty"
              className="mt-1 block w-full"
              placeholder="Quantity Product"
              value={values.qty}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="pic" value="PIC" />
            <Select
              id="pic"
              options={picOptions}
              isSearchable={true}
              placeholder="Select PIC"
              value={values.pic}
              onChange={(selected) => handleSelectUser("pic", selected)}
              className="mt-1"
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="supplierName" value="Supplier Name" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={supplierName}
              readOnly
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="categoryName" value="Category Product" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={categoryName}
              readOnly
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="image" value="Attach Photo" />
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              multiple
              className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleChange}
            />
            <span className="text-gray-500 text-xs">- Maximum photo size: 2 MB (JPEG, PNG, JPG)</span>
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="document" value="Attach Document" />
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
