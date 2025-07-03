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
import Select from "react-select";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast"; 

export function ButtonModalEmployee({userRole}) {

  const genderOptions = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" },
    { value: "other", label: "Lainnya" }
  ];

  const departemenOptions = [
    { value: "warehouse", label: "Warehouse" },
    { value: "logistik", label: "Logistik" },
    { value: "humanResouce", label: "Human Resource(HR)" },
    { value: "finance", label: "Finance" }
  ];

  // State untuk form
  const [values, setValues] = useState({
    name: "",
    email: "",
    departemen: null,
    dateOfBirth: "",
    gender: null,
    phone: "",
    address: "",
  });

  // State untuk error
  const [errors, setErrors] = useState({});

  // Handle perubahan input
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({}); // Reset error sebelum submit
  
    console.log("Values sebelum dikirim:", values); // Debugging
  
    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/employee",
      hr: "/hr/employee",
    };
  
    const userPath = rolePaths[userRole];
  
    // Kirim data ke backend
    router.post(
      userPath,
      values,
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Employee data saved successfully! 🎉", {
            duration: 5000,
          });
          setValues({
            name: "",
            email: "",
            departemen: "",
            dateOfBirth: "",
            gender: "",
            phone: "",
            address: "",
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Failed to save Employee data! ❌", {
            duration: 5000,
          });
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
          <DialogTitle>Data Employee</DialogTitle>
          <DialogDescription>
            Enter employee data, then click Save.Enter employee data, then click Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full"
              placeholder="Name Employee"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="text"
              name="email"
              className="mt-1 block w-full"
              placeholder="Name Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          {/* <div className="mt-4">
            <InputLabel htmlFor="departemen" value="Departemen" />
            <TextInput
              id="departemen"
              type="text"
              name="departemen"
              className="mt-1 block w-full"
              placeholder="Nama Departemen"
              value={values.departemen}
              onChange={handleChange}
            />
            {errors.departemen && <p className="text-red-500 text-sm">{errors.departemen}</p>}
          </div> */}
          {/* dropdown departemen */}
          <div className="mt-4">
            <InputLabel htmlFor="departemen" value="Departemen" />
            <Select
              id="departemen"
              name="departemen"
              options={departemenOptions}
              placeholder="Select Departemen"
              value={departemenOptions.find(option => option.value === values.departemen)}
              onChange={(option) => setValues((prevValues) => ({ ...prevValues, departemen: option.value }))}
              className="mt-1"
            />
            {errors.departemen && <p className="text-red-500 text-sm">{errors.departemen}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="dateOfBirth" value="Date of Birth" />
            <TextInput
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              className="mt-1 block w-full"
              placeholder="Tangal Lahir"
              value={values.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </div>
          {/* dropdown jenis kelamin */}
          <div className="mt-4">
            <InputLabel htmlFor="gender" value="Gender" />
            <Select
              id="gender"
              name="gender"
              options={genderOptions}
              placeholder="Select Gender"
              value={genderOptions.find(option => option.value === values.gender)}
              onChange={(option) => setValues((prevValues) => ({ ...prevValues, gender: option.value }))}
              className="mt-1"
            />
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="phone" value="Phone Number" />
            <TextInput
              id="phone"
              type="text"
              name="phone"
              className="mt-1 block w-full"
              placeholder="Phone Number"
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <textarea
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
              placeholder="Name Address"
              value={values.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
