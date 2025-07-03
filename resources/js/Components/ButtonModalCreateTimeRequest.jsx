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
import { Textarea } from "flowbite-react";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";

export function ButtonModalCreateTimeRequest({ userRole, employee }) {
  const [values, setValues] = useState({
    name: "",
    note: "",
    leave_dates: [],
  });

  const employeeOptions = employee.map((empy) => ({
    value: empy.id,
    label: empy.name,
  }));

  function handleSelectChange(name, selectedOption) {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  }

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const rolePaths = {
      admin: "/admin/timeoff",
      wrhs: "/wrhs/timeoff",
      fnc: "/fnc/timeoff",
      hr: "/hr/timeoff",
      staff: "/staff/timeoff",
    };

    const userPath = rolePaths[userRole];
    
    // Format tanggal ke string
    const formattedDates = values.leave_dates.map((date) =>
      date.format("YYYY-MM-DD")
    );

    const formData = {
      ...values,
      leave_dates: formattedDates,
      name: values.name?.label || "",
      employee_id: values.name?.value || null,
      leave_dates: formattedDates,
    };

    router.post(userPath, formData, {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Leave data saved successfully! 🎉", {
          duration: 5000,
        });
        setValues({
          name: "",
          note: "",
          leave_dates: [],
        });
      },
      onError: (err) => {
        setErrors(err);
        toast.error("Failed to save leave data! ❌", {
          duration: 5000,
        });
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Create</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Employee leave data</DialogTitle>
          <DialogDescription>
             Enter the employee's Leave data, then click Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Name Employee" />
            <Select
              id="name"
              options={employeeOptions}
              isSearchable={true}
              placeholder="Select Employee"
              value={values.name}
              onChange={(selected) => handleSelectChange("name", selected)}
              className="mt-1"
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="note" value="Reason for leaving" />
            <Textarea
              id="note"
              name="note"
              className="mt-1 block w-full"
              placeholder="Example: Sickness, Family needs, etc."
              value={values.note}
              onChange={handleChange}
            />
            {errors.note && <p className="text-red-500 text-sm">{errors.note}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="leave_dates" value="Date of Leave" className=""/>
            <DatePicker
              multiple
              value={values.leave_dates}
              onChange={(dates) => setValues({ ...values, leave_dates: dates })}
              className="w-full mt-1"
            />
            {errors.leave_dates && (
              <p className="text-red-500 text-sm">{errors.leave_dates}</p>
            )}
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
