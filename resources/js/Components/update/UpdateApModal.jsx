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
import TextInput from "../TextInput";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react"; 
import Inbound from "@/Pages/features/Inbound";

const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(angka);
};

export function UpdateApModal({ userRole, open, onClose, inbound, productData, apData, bp, select }) {
    const { flash } = usePage().props;
    
    const { data, setData, errors, setErrors, put, reset } = useForm({
        qty: "",
        unit_price: "",
        tax: "",
        total_amount: "",
        due_date: "",
        supplier_name: "",
        status_payment: "",
        discount: "",
        note: "",
        terms_condition: "",
        inbound_status: inbound ?. status_inbound ?? "",
        bp: "",
    });

    const [includeTax, setIncludeTax] = useState(true);

    useEffect(() => {
        
        if (!inbound || apData.length === 0) return;
        const selectedApData = apData.find(ap => Number(ap.inbound_id) === Number(inbound.inbound_id));
        const itemDescription = JSON.parse(inbound.item_description)
        
        if(inbound.inbound_id === null){
            setData(prevData => ({
                ...prevData,
                inbound_id: inbound?.inbound_id || "",
                tax: inbound?.tax ?? "0",
                total_amount: inbound?.total_amount ?? "0",
                due_date: inbound?.due_date || "",
                status_payment: inbound?.status_payment ?? "unpaid",
                status_inbound: inbound?.status_inbound ?? false,
                discount: inbound?.discount ?? "0",
                note: inbound?.note ?? "",
                terms_condition: inbound?.terms_condition ?? "",
                billed_party: inbound?.billed_party_id ?? "",
                ap_code : inbound?.ap_code ?? "",
                item_description: itemDescription,

                qty: null,  
                unit_price: null,
                supplier_name: null,
                ap_code : inbound?.ap_code ?? "",
                id: inbound?.id??"",
                selected_item: "multi"
            }));
        }else{
            setData(prevData => ({
                ...prevData,
                inbound_id: inbound?.inbound_id || "",
                qty: selectedApData?.inbound?.qty ?? "",
                unit_price: selectedApData?.unit_price ?? "",
                tax: selectedApData?.tax ?? "0",
                total_amount: selectedApData?.total_amount ?? "0",
                due_date: selectedApData?.due_date || "",
                supplier_name: selectedApData?.inbound?.product?.supplier?.name ?? "Tidak Diketahui",
                status_payment: selectedApData?.status_payment ?? "unpaid",
                status_inbound: selectedApData?.status_inbound ?? false,
                ap_code :selectedApData?.ap_code ?? "",
                id: inbound?.id??"",

                selected_item: "single",
                discount: null,
                note: null,
                terms_condition: null,
                item_description: null,
            }));
        }
        
    }, [inbound, apData]);

    useEffect(() => {
        if (flash?.success) {
            // toast.success(flash.success, { duration: 5000 });
            onClose();
        }
        if (flash?.error) {
            // toast.error(flash.error, { duration: 5000 });
        }
    }, [flash]);

    useEffect(() => {
        if (!data.items) {
            setData("items", []);
        }
    }, [data.items]);

    function handleSubmit(e) {
        e.preventDefault();

        const rolePaths = {
            admin: `/admin/ap/${inbound?.id}`,
            fnc: `/finance/ap/${inbound?.id}`,
        };

        const userPath = rolePaths[userRole];

        put(userPath, data, {
            forceFormData: true,
            onError: (errors) => {
                setErrors(errors);
                toast.error("Gagal memperbarui Data Account Payable! ❌");
            },
        });
    }

      function addItem() {
        const newItem = { 
            id: Date.now(), 
           description: '',
            qty: 0,
            unit_price: 0 
        };
        setData(prevData => ({
            ...prevData,
            item_description: [...prevData.item_description, newItem]
          }));
      }
    
      function removeItem(index) {
        setData(prevState => ({
            ...prevState,
            item_description: prevState.item_description.filter((_, i) => i !== index) // menghapus berdasarkan indeks
        }));
      }

      let inbnStatus;
      if(data.status_inbound == 0 ||data.status_inbound == false){
        inbnStatus = false
      }else{
        inbnStatus = true;
      }

      useEffect(() => {
        if (inbnStatus) {
            const unitPrice = parseFloat(data.unit_price) || 0;
            const qty = parseInt(data.qty) || 0;
            const tax = parseFloat(data.tax) || 0;
    
            let total = unitPrice * qty;
    
            if (!includeTax) {
                total += (total * tax) / 100;
            }
    
            setData("total_amount", total);
        } else {
            let total = (data.item_description || []).reduce((acc, item) => {
                const qty = parseInt(item.qty) || 0;
                const unitPrice = parseFloat(item.unit_price) || 0;
                return acc + qty * unitPrice;
            }, 0);
    
            const discountValue = parseFloat(data.discount) || 0;
            const taxValue = parseFloat(data.tax) || 0;
    
            let totalAfterDiscount = total - (total * discountValue) / 100;
            let taxAmount = (totalAfterDiscount * taxValue) / 100;
            let finalTotal = totalAfterDiscount + taxAmount;
    
            setData("total_amount", finalTotal);
        }
    }, [
        data.unit_price,
        data.qty,
        data.tax,
        includeTax,
        data.item_description,
        data.discount,
    ]);
    
    // Fungsi untuk mengubah nilai item_description dengan aman
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...(data.item_description || [])];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setData("item_description", updatedItems);
    };
    

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md">
                <DialogHeader>
                    <DialogTitle>Update Data Account Payable</DialogTitle>
                    <DialogDescription>Update data Payable yang masuk, lalu klik Simpan.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                {inbnStatus === false ? (
                    <>
                    {data.item_description?.map((item, index) => (
                    <div key={index} className="mt-4 border p-3 rounded-md relative">
                        <InputLabel htmlFor={`description_${index}`} value={`Item Description ${index + 1}`} />
                        <TextInput
                        id={`description_${index}`}
                        name={`description_${index}`}
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        />

                        <InputLabel htmlFor={`qty_${index}`} value="Quantity" />
                        <input
                        id={`qty_${index}`}
                        type="number"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                        />

                        <InputLabel htmlFor={`unit_price_${index}`} value="Unit Price" />
                        <input
                        id={`unit_price_${index}`}
                        type="number"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                        />
                        <p className="text-gray-600 text-sm mt-1">{formatRupiah(item.unit_price)}</p>

                        {data.item_description.length > 1 && (
                            <Button type="button" className="bg-red-500 text-white mt-2" onClick={() => removeItem(index)}>
                                Hapus Item
                            </Button>
                        )}
                    </div>
                    ))}
                    <Button type="button" className="bg-blue-500 text-white mt-3" onClick={addItem}>
                    + Tambah Item Description
                    </Button>
                    <br /><br />

                        <InputLabel htmlFor="discount" value="Discount (%)" />
                        <input
                        id="discount"
                        type="number"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={data.discount}
                        onChange={(e) => setData("discount", e.target.value)}
                        />
            
                        <InputLabel htmlFor="tax" value="Tax (%)" />
                        <input
                        id="tax"
                        type="number"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={data.tax}
                        onChange={(e) => setData("tax", e.target.value)}
                        />
            
                        <InputLabel htmlFor="due_date" value="Due Date" />
                        <input
                        id="due_date"
                        type="date"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={data.due_date}
                        required
                        onChange={(e) => setData("due_date", e.target.value)}
                        />
            
                        <InputLabel htmlFor="total_amount" value="Total Amount" />
                        <input
                        id="total_amount"
                        type="text"
                        className="mt-1 block w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
                        value={formatRupiah(data.total_amount)}
                        disabled
                        />
            
                        <InputLabel htmlFor="note" value="Note" />
                        <textarea id="note" className="mt-1 block w-full border p-2 rounded-md" value={data.note} onChange={(e) => setData("note", e.target.value)} />
            
                        <InputLabel htmlFor="terms_condition" value="Terms & Condition" />
                        <textarea id="terms_condition" className="mt-1 block w-full border p-2 rounded-md" value={data.terms_condition} onChange={(e) => setData("terms_condition", e.target.value)} />
            
                        <InputLabel htmlFor="status_payment" value="Status Payment" />
                        <select
                        id="status_payment"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={data.status_payment}
                        onChange={(e) => setData("status_payment", e.target.value)}
                        >
                        <option value="unpaid">Unpaid</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="canceled">Canceled</option>
                        </select>
            
                        <div className="mt-4">
                            <InputLabel htmlFor="bp" value="Billed Party" />
                            <select
                            id="bp"
                            name="bp"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.bp || ""}
                            onChange={(e) => setData("bp", e.target.value)}
                            >
                            <option value={data.billed_party}></option> {}
                            {bp.map((bp) => (
                                <option key={bp.id} value={bp.id}>{bp.bill_to}</option>
                            ))}
                            </select>
                        </div>
                    
                    <DialogFooter>
                        <Button type="button" className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white mt-5">
                            Simpan
                        </Button>
                    </DialogFooter>
                    </>
                ) : (
                    <>
                    <div className="mt-4">
                        <InputLabel htmlFor="product_id" value="Product" />
                        <select
                            disabled
                            id="product_id"
                            name="product_id"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.product_id}
                            onChange={(e) => setData("product_id", e.target.value)}
                        >
                            {productData.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="qty" value="Jumlah Produk" />
                        <input
                            id="qty"
                            type="number"
                            name="qty"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.qty}
                            onChange={(e) => setData("qty", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="unit_price" value="Harga Per Unit" />
                        <input
                            id="unit_price"
                            type="number"
                            name="unit_price"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.unit_price}
                            onChange={(e) => setData("unit_price", e.target.value)}
                        />
                        <p className="text-gray-600 text-sm mt-1"> {formatRupiah(data.unit_price)} </p>
                    </div>

                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="includeTax"
                            checked={includeTax}
                            onChange={() => setIncludeTax(!includeTax)}
                            className="mr-2"
                        />
                        <label htmlFor="includeTax">Include Tax</label>
                    </div>

                    {!includeTax && (
                        <div className="mt-4">
                            <InputLabel htmlFor="tax" value="Tax (%)" />
                            <input
                                id="tax"
                                type="number"
                                name="tax"
                                className="mt-1 block w-full border p-2 rounded-md"
                                value={data.tax}
                                onChange={(e) => setData("tax", e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <InputLabel htmlFor="total_amount" value="Total Amount" />
                        <input
                            id="total_amount"
                            type="text"
                            name="total_amount"
                            className="mt-1 block w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
                            value={formatRupiah(data.total_amount)}
                            disabled
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="due_date" value="Due Date" />
                        <input
                            id="due_date"
                            type="date"
                            name="due_date"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.due_date}
                            required
                            onChange={(e) => setData("due_date", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="supplier_name" value="Nama Supplier" />
                        <input
                            id="supplier_name"
                            type="text"
                            name="supplier_name"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.supplier_name}
                            readOnly
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status_payment" value="Status Pembayaran" />
                        <select
                            id="status_payment"
                            name="status_payment"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.status_payment}
                            onChange={(e) => setData("status_payment", e.target.value)}
                        >
                            <option value="unpaid">Unpaid</option>
                            <option value="scheduled">scheduled</option>
                            {/* <option value="canceled">Canceled</option> */}
                        </select>
                    </div>

                    <DialogFooter>
                        <Button type="button" className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white mt-5">
                            Simpan
                        </Button>
                    </DialogFooter>
                    </>
                )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
