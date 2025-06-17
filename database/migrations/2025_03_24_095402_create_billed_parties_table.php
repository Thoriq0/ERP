<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('billed_parties', function (Blueprint $table) {
            $table->id();
            $table->string('bill_to');
            $table->string('address_bill')->nullable();
            $table->string('contact_bill');
            $table->string('email_bill')->nullable();
            $table->integer('account_bill');
            $table->string('account_bill_name');
            $table->string('account_bank_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billed_parties');
    }
};
