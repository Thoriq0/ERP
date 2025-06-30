import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import InputLabel from "../InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react"; 

export function UpdateUserModal({open, onClose, userSelected, users }) {
  const {flash} = usePage().props;
  const { data, setData, errors, setErrors, put, reset } = useForm({
    name: users?.name || "",
    role: users?.role || "",
    email: users?.email || "",
    address: users?.address ||"",
    status: users?.status || "",
    uniqueNumber: users?.uniqueNumber || ""
  });
  
  useEffect(() => {
    if (users) {
      setData({
        name: users.name,
        role: users.role,
        email: users.email,
        address: users.address,
        status: users.status,
        uniqueNumber: users?.uniqueNumber || ""
      });
    }
  }, [users]);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
      onClose(); 
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  function handleSubmit(e) {
    e.preventDefault();

    const rolePaths = {
      admin: `/admin/user/${users?.id}`,
    //   wrhs: `/wrhs/users/${userSelected?.id}`,
    };
    const dummyRole = 'admin';
    const userPath = rolePaths[dummyRole];

    put(userPath, data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Failed to update Data User! ❌");
      },
    });
    
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Data User Warehouse</DialogTitle>
          <DialogDescription>
            Update the user warehouse data, then click Save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Name User" />
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Name User"
              value={data.name || ""}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />
            <input
              id="email"
              type="text"
              name="email"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Email User"
              value={data.email || ""}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <input
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Address"
              value={data.address || ""}
              onChange={(e) => setData("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="role" value="Role" />
            <select
                id="role"
                name="role"
                className="mt-1 block w-full border p-2 rounded-md"
                value={data.role || ""}
                onChange={(e) => setData("role", e.target.value)}
            >
                <option value="">-- Pilih Role --</option>
                <option value="fnc">Finance</option>
                <option value="wrhs">Warehouse</option>
                <option value="admin">Super Admin</option>
                <option value="hr">Humas Resource</option>
                <option value="logistik">Logistik</option>
                <option value="staff">Staff</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
          <div className="mt-4">
            <InputLabel htmlFor="status" value="Status" />
            <select
                id="status"
                name="status"
                className="mt-1 block w-full border p-2 rounded-md"
                value={data.status || ""}
                onChange={(e) => setData("status", e.target.value)}
            >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="not active">Not Active</option>
                <option value="validating">Validating</option>
                <option value="out">Out</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
            </div>
          
          <DialogFooter>
            <Button
              type="button"
              className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white mt-5">
              Save
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
