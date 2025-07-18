<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class ModelChanged implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $model;
    public $action;
    public $data;

    public function __construct($model, $action, $data)
    {
        $this->model = $model;
        $this->action = $action;
        $this->data = $data;
    }

    public function broadcastOn()
    {
        return new Channel('models');
    }

    public function broadcastAs()
    {
        return 'model.changed';
    }
}

