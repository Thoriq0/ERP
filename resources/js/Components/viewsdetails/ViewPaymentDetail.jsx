import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function ViewPaymentDetail({ open, onClose, payment, data }) {
    
    const statusInbound = parseInt(payment?.account_payable?.status_inbound);
    const itemsRaw = JSON.parse(payment?.account_payable?.item_description || "[]");
    const subTotal = itemsRaw.reduce((acc, item) => acc + item.qty * item.unit_price, 0);

    // console.log(payment)

    const dueDate = new Date(payment?.account_payable?.due_date);
    const today = new Date();

    // Hitung selisih hari (dalam milidetik)
    const diffTime = dueDate - today;
    // Konversi ke hari
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let emoji = "";

    if (diffDays < 0) {
    emoji = "❌"; // Sudah lewat due date
    } else if (diffDays === 0) {
    emoji = "⏳"; // Due date hari ini
    } else if (diffDays <= 3) {
    emoji = "⚠️"; // Due date dalam 3 hari ke depan
    }
    

    // Get inbound code 
    const getInboundCode = payment?.account_payable?.inbound?.inbound_code
    // Get InboundBunlding
    const bundlingInbound = data.filter(item => item.account_payable?.inbound?.inbound_code);
    // Variabel ID Bundling Inbound
    let idFilterAp = [];
    // Lempar id dengan inboundCode yg sma
    if(getInboundCode === null){

    }else{
        const filteredData = bundlingInbound.filter(item => item?.account_payable?.inbound?.inbound_code === getInboundCode);
        if(filteredData.length === 0){

        }else {
            filteredData.forEach(item => {
                idFilterAp.push(item?.account_payable?.id);
            });
        }
    }
    // SubTotal InboundBundling
    let subTotalPrice = data
    .filter(item => idFilterAp.includes(item?.account_payable?.id))
    .reduce((sum, item) => sum + (item?.account_payable?.total_amount || 0), 0);
    // Tax Bundling
    let taxBundling = () => {
        let tax;
        payment?.account_payable?.tax === 0 || payment?.account_payable?.tax === null 
            ? tax = 11 / 100 * subTotalPrice
            : tax = payment?.account_payable?.tax ?? 0 / 100 * subTotalPrice
        return tax;
    }
    // GrandTotal Bundling
    let grandTotalBundling = subTotalPrice + taxBundling()

    let taxSingle = () => {
        let tax;
        payment?.account_payable?.tax === 0 || payment?.account_payable?.tax === null 
            ? tax = 11 / 100 * payment?.account_payable?.total_amount
            : tax = payment?.account_payable?.tax ?? 0 / 100 * payment?.account_payable?.total_amount
        return tax;
    }

    let singleGrandTotal = payment?.account_payable?.total_amount + taxSingle();

    // let coba = data.filter(item => idFilterAp.includes(item?.account_payable?.id))

    // console.log("ID FILTER", idFilterAp)
    // console.log("DATA", data)
    // console.log("COBA", coba)
    // console.log(bundlingInbound);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[370px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            This section provides detailed information about the selected payment.
          </DialogDescription>
        </DialogHeader>
        {statusInbound === 0 ? (
        <div className="mt-4 space-y-2">
            <h3 className="text-end font-semibold">{emoji} {diffDays < 0 ? "OVERDUE" : "DUE SOON"}</h3>
            <div className="mb-4 space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Billing Information */}
                    <div className="p-4">
                        <p>Invoice Code : {payment?.account_payable?.ap_code || "Tidak Diketahui"}</p>
                        <p className="text-sm">Due Date : {payment?.account_payable?.due_date || "Tidak Diketahui"}</p>
                    </div>
                    
                    {/* Customer Billing Details */}
                    <div className="p-4">
                        <h3 className="font-semibold border-b pb-2">Billing Details</h3>
                        <p>Bill To : {payment?.account_payable?.billed_party?.bill_to || "Tidak Diketahui"}</p>
                        <p>Account Number : {payment?.account_payable?.billed_party?.account_bill || "Tidak Diketahui"}</p>
                        <p>Bank Name : {payment?.account_payable?.billed_party?.account_bank_name || "Tidak Diketahui"}</p>
                    </div>
                </div>
            </div>
            
            <hr /><br />

            <table className="w-full text-sm text-left border-collapse">
                <thead>
                    <tr className="border-b bg-gray-200">
                        <th className="py-2 text-center w-12">No</th>
                        <th className="py-2">Nama Item</th>
                        <th className="py-2 text-center w-16">Qty</th>
                        <th className="py-2 text-right w-24">Unit Price</th>
                        <th className="py-2 text-right w-24">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsRaw.map((itm, index) => {
                        const amount = itm.qty * itm.unit_price;
                        return (
                            <tr key={index} className="border-b">
                                <td className="py-2 text-center">{index + 1}</td>
                                <td className="py-2">{itm.description}</td>
                                <td className="py-2 text-center">{itm.qty}</td>
                                <td className="py-2 text-right">Rp {parseInt(itm.unit_price).toLocaleString("id-ID")}</td>
                                <td className="py-2 text-right">Rp {amount.toLocaleString("id-ID")}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                <div className="text-sm text-gray-600 md:w-1/2 pl-1">
                    <p className="font-semibold">Note:</p>
                    <p>{payment?.account_payable?.note || "Tidak Diketahui"}</p>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0">
                    <div className="flex justify-between border-t pt-2 text-sm">
                        <span>Subtotal:</span>
                        <span>Rp {subTotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax ({payment?.account_payable?.tax || "0"}%):</span>
                        <span>Rp {(subTotal * (payment?.account_payable?.tax / 100)).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2">
                        <span>Discount ({payment?.account_payable?.discount || "0"}%):</span>
                        <span>Rp {(subTotal * (payment?.account_payable?.discount / 100)).toLocaleString("id-ID")}</span>
                    </div>
                    <hr/>
                    <div className="flex justify-between text-lg font-bold pt-2">
                        <span>Total:</span>
                        <span>Rp {payment?.account_payable?.total_amount.toLocaleString("id-ID")}</span>
                    </div>
                </div>
            </div>
          
        </div>
        ) : 
            getInboundCode === null
            ? (
            <div className="mt-4 space-y-2">

                <h3 className="text-end font-semibold">{emoji} {diffDays < 0 ? "OVERDUE" : "DUE SOON"}</h3>
                <div className="mb-4 space-y-4 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Billing Information */}
                        <div className="p-4">
                            <p>Invoice Code : {payment?.account_payable?.ap_code || "Tidak Diketahui"}</p>
                            <p className="text-sm">Due Date : {payment?.account_payable?.due_date || "Tidak Diketahui"}</p>
                        </div>
                        
                        {/* Customer Billing Details */}
                        <div className="p-4">
                            <h3 className="font-semibold border-b pb-2">Billing Details</h3>
                            <p>Bill To : {payment?.account_payable?.inbound?.product?.supplier?.account_name || "Tidak Diketahui"}</p>
                            <p>Account Number : {payment?.account_payable?.inbound?.product?.supplier?.account_number || "Tidak Diketahui"}</p>
                            <p>Bank Name : {payment?.account_payable?.inbound?.product?.supplier?.account_bank_name || "Tidak Diketahui"}</p>
                        </div>
                    </div>
                </div>
                
                <hr /><br />

                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-200">
                            <th className="py-2 text-center w-12">No</th>
                            <th className="py-2">Nama Item</th>
                            <th className="py-2 text-center w-16">Qty</th>
                            <th className="py-2 text-right w-24">Unit Price</th>
                            <th className="py-2 text-right w-24">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 text-center">1</td>
                            <td className="py-2">{payment.account_payable?.inbound?.product?.name}</td>
                            <td className="py-2 text-center">{payment.account_payable?.inbound?.qty}</td>
                            <td className="py-2 text-right">Rp {payment.account_payable?.unit_price.toLocaleString("id-ID")}</td>
                            <td className="py-2 text-right">Rp {payment.account_payable?.total_amount.toLocaleString("id-ID")}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                    <div className="text-sm text-gray-600 md:w-1/2 pl-1">
                        <p className="font-semibold">Note:</p>
                        <p>{payment?.account_payable?.note || "Tidak Ada"}</p>
                    </div>
                    <div className="md:w-1/3 mt-4 md:mt-0">
                        <div className="flex justify-between border-t pt-2 text-sm">
                            <span>Subtotal:</span>
                            <span>Rp {payment.account_payable?.total_amount.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax ({payment?.account_payable?.tax === 0 ? 11 : payment?.account_payable?.tax }%):</span>
                            <span>Rp {taxSingle().toLocaleString("id-ID")}</span>
                        </div>
                        <hr/>
                        <div className="flex justify-between text-lg font-bold pt-2">
                            <span>Total:</span>
                            <span>Rp {singleGrandTotal.toLocaleString("id-ID")}</span>
                        </div>
                    </div>
                </div>
            </div>
        ) : 
        (
            <div className="mt-4 space-y-2">
            <h3 className="text-end font-semibold">{emoji} {diffDays < 0 ? "OVERDUE" : "DUE SOON"}</h3>
            <div className="mb-4 space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Billing Information */}
                    <div className="p-4">
                        <p>Invoice Code : {payment?.account_payable?.ap_code || "Tidak Diketahui"}</p>
                        <p className="text-sm">Due Date : {payment?.account_payable?.due_date || "Tidak Diketahui"}</p>
                    </div>
                    
                    {/* Customer Billing Details */}
                    <div className="p-4">
                        <h3 className="font-semibold border-b pb-2">Billing Details</h3>
                        <p>Bill To : {payment?.account_payable?.inbound?.product?.supplier?.account_name || "Tidak Diketahui"}</p>
                        <p>Account Number : {payment?.account_payable?.inbound?.product?.supplier?.account_number || "Tidak Diketahui"}</p>
                        <p>Bank Name : {payment?.account_payable?.inbound?.product?.supplier?.account_bank_name || "Tidak Diketahui"}</p>
                    </div>
                </div>
            </div>
            
            <hr /><br />

            <table className="w-full text-sm text-left border-collapse">
                <thead>
                    <tr className="border-b bg-gray-200">
                        <th className="py-2 text-center w-12">No</th>
                        <th className="py-2">Nama Item</th>
                        <th className="py-2 text-center w-16">Qty</th>
                        <th className="py-2 text-right w-24">Unit Price</th>
                        <th className="py-2 text-right w-24">Amount</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        
                        data.
                        filter(item => idFilterAp.includes(item?.account_payable?.id))
                        .map((item, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="py-2 text-center">{idx + 1}</td>
                                <td className="py-2">{item.account_payable?.inbound?.product?.name}</td>
                                <td className="py-2 text-center">{item.account_payable?.inbound?.qty}</td>
                                <td className="py-2 text-right">Rp {item.account_payable?.unit_price.toLocaleString("id-ID")}</td>
                                <td className="py-2 text-right">Rp {item.account_payable?.total_amount.toLocaleString("id-ID")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                <div className="text-sm text-gray-600 md:w-1/2 pl-1">
                    <p className="font-semibold">Note:</p>
                    <p>{payment?.account_payable?.note || "Tidak Ada"}</p>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0">
                    <div className="flex justify-between border-t pt-2 text-sm">
                        <span>Subtotal:</span>
                        <span>Rp {subTotalPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax ({payment?.account_payable?.tax === 0 ? 11 : payment?.account_payable?.tax }%):</span>
                        <span>Rp {taxBundling().toLocaleString("id-ID")}</span>
                    </div>
                    <hr/>
                    <div className="flex justify-between text-lg font-bold pt-2">
                        <span>Total:</span>
                        <span>Rp {grandTotalBundling.toLocaleString("id-ID")}</span>
                    </div>
                </div>
            </div>
          
        </div>
        
        )
        }
        <DialogFooter>
          <Button
            type="button"
            className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
