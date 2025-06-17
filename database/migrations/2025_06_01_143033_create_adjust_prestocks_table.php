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
        Schema::create('adjust_prestocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inbound_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('adjust_qty');
            $table->string('created_by')->nullable();
            $table->text('note');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adjust_prestocks');
    }
};
