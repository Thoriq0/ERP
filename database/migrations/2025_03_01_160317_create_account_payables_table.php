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
        Schema::create('account_payables', function (Blueprint $table) {
            $table->id();
            $table->string('ap_code')->unique();
            $table->foreignId('inbound_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->decimal('unit_price', 15, 2)->nullable(); 
            $table->integer('tax')->nullable();
            $table->decimal('total_amount', 15, 2)->nullable(); 
            $table->string('status_payment')->nullable();
            $table->date('due_date')->nullable();
            $table->string('status_inbound')->nullable();
            $table->json('item_description')->nullable();
            $table->integer('discount')->nullable();
            $table->text('note')->nullable();
            $table->text('terms_condition')->nullable();
            $table->foreignId('billed_party_id')->nullable()->constrained()->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_payables');
    }
};
