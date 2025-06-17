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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_payable_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            // $table->foreignId('inbound_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('payment_code')->nullable();
            $table->string('status_payment');
            $table->string('created_by')->nullable();
            // $table->string('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
