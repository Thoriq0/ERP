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
        Schema::create('staging_inbounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inbound_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('status');
            $table->string('stock_status');
            $table->string('payment_status');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staging_inbounds');
    }
};
