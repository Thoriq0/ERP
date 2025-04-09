import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function ViewApDetailModal({ open, onClose, inbound, productData, apData, bp}) {
    const invoiceRef = useRef(null);

    const product = productData.find(prod => prod.id === inbound?.inbound?.product?.id);
    const itemRaw = inbound ?. status_inbound // 1 Single 0 Multiple
    const item = parseInt(itemRaw);
    // const contoh = inbound?.inbound?.product?.supplier?.name;

    const itemss = JSON.parse(inbound?.item_description || "[]");
    const subTotal = itemss.reduce((acc, item) => acc + item.qty * item.unit_price, 0);

    // console.log(product)

    const downloadInvoice = async () => {
        const invoiceElement = invoiceRef.current;
        const canvas = await html2canvas(invoiceElement, { scale: 10 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
    
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`Invoice_${inbound?.ap_code || "Unknown"}.pdf`);
    };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[550px] max-w-[370px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-2 py-5 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Detail Data Inbound</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data inbound.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <div ref={invoiceRef} className="p-4">
        {item === 0 ? (

            <div className="mt-4 space-y-2 text-sm md:text-md">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <img src="/images/Logo.svg" alt="Company Logo" className="h-16" />
                    <div className="text-right">
                    <h2 className="text-xl font-bold">{inbound?.ap_code || "Tidak Diketahui"}</h2>
                        <div className=""><span className="uppercase">{inbound?.status_payment || "Tidak Diketahui"}</span></div>
                        <div className="">Date : <span>{inbound?.due_date || "Tidak Diketahui"}</span></div>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="mb-4 space-y-4 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Billing Information */}
                        <div className="p-4">
                            <h3 className="font-semibold border-b pb-2">Company Details</h3>
                            <p>PT. GLOBAL EDUTEK SOLUSINDO</p>
                            <p className="text-sm">Benda Baru, Kec. Pamulang, Kota Tangerang Selatan, Banten 15415</p>
                            <p className="text-sm">Phone : +62 812 8997 4646</p>
                        </div>
                        
                        {/* Customer Billing Details */}
                        <div className="p-4">
                            <h3 className="font-semibold border-b pb-2">Billing Details</h3>
                            <p>Bill To : {inbound?.billed_party?.bill_to || "Tidak Diketahui"}</p>
                            <p>Account Number : {inbound?.billed_party?.account_bill || "Tidak Diketahui"}</p>
                            <p>Bank Name : {inbound?.billed_party?.account_bank_name || "Tidak Diketahui"}</p>
                        </div>
                    </div>
                </div>

                {/* Item List as Table */}
                <div className="flex">
                    <h3 className="text-sm font-semibold pb-2 mb-2 px-2">Details</h3>
                    <hr className="border-gray-500 border-1 w-full mt-3"/>
                </div>
                <div className="p-4 border rounded-lg shadow bg-gray-50">
                    
                    <table className="w-full text-sm text-left border-collapse ">
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
                            {JSON.parse(inbound?.item_description || "[]").map((itm, index) => {
                                const amount = itm.qty * itm.unit_price;
                                return (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 text-center">{index + 1}</td>
                                        <td className="py-2">{itm.description}</td>
                                        <td className="py-2 text-center">{itm.qty}</td>
                                        <td className="py-2 text-right">Rp {parseInt(itm.unit_price).toLocaleString("id-ID")}</td>
                                        <td className="py-2 text-right font-semibold">Rp {amount.toLocaleString("id-ID")}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Informasi Tambahan & Total */}
                    <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                        <div className="text-sm text-gray-600 md:w-1/2 pl-1">
                            <p className="font-semibold">Note:</p>
                            <p>{inbound?.note || "Tidak Diketahui"}</p>
                        </div>
                        <div className="md:w-1/3 mt-4 md:mt-0">
                            <div className="flex justify-between border-t pt-2 text-sm">
                                <span>Subtotal:</span>
                                <span>Rp {subTotal.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax ({inbound?.tax || "0"}%):</span>
                                <span>Rp {(subTotal * (inbound?.tax / 100)).toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-sm pb-2">
                                <span>Discount ({inbound?.discount || "0"}%):</span>
                                <span>Rp {(subTotal * (inbound?.discount / 100)).toLocaleString("id-ID")}</span>
                            </div>
                            <hr/>
                            <div className="flex justify-between text-lg font-bold pt-2">
                                <span>Total:</span>
                                <span>Rp {inbound?.total_amount.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="mt-4 space-y-2 text-sm px-2 pt-2">
                    <div className="flex justify-between"><strong>Terms & Condition:</strong> <span>{inbound?.terms_condition || ""}</span></div>
                </div>
            </div>
        ) : (
            <div className="mt-4 space-y-2">
                <div className="flex">
                    <strong className="min-w-[150px]">AP Code</strong>
                    <span className="mr-2">:</span>
                    <span>{inbound?.ap_code || "Tidak Diketahui"}</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">Status Payment</strong>
                    <span className="mr-2">:</span>
                    <span className="uppercase">{inbound?.status_payment || "Tidak Diketahui"}</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">Due Date</strong>
                    <span className="mr-2">:</span>
                    <span>{inbound?.due_date || "Tidak Diketahui"}</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">Nama Supplier</strong>
                    <span className="mr-2">:</span>
                    <span>{product?.supplier?.name || "Tidak Diketahui"}</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">Unit Price</strong>
                    <span className="mr-2">:</span>
                    <span>Rp.{inbound?.unit_price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">QTY</strong>
                    <span className="mr-2">:</span>
                    <span>{inbound?.inbound?.qty}</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">Tax</strong>
                    <span className="mr-2">:</span>
                    <span>{inbound?.tax === 0 ? 'Include Tax' : inbound?.tax }%</span>
                </div>
                <div className="flex">
                    <strong className="min-w-[150px]">Total Amount</strong>
                    <span className="mr-2">:</span>
                    <span>Rp.{inbound?.total_amount.toLocaleString("id-ID")}</span>
                </div>
            </div>
        )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="bg-gray-200 text-black border border-gray-400 mt-5 mx-auto w-3/4 mb-5 md:mx-0 md:mb-0 md:w-[80px] hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </Button>
          {item === 0 ? (
            <Button onClick={downloadInvoice} className="bg-primaryPurple border border-gray-400 mt-5 mx-auto w-3/4 md:w-[200px] hover:bg-PurpleFive">
            Download Invoice
          </Button>
          ) : (
            ''
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}