extends CharacterBody2D

const SPEED = 64.0
const TURN_SPEED = 2
  
@export var gay2: CollisionShape2D

@onready var collision_shape_2d: CollisionShape2D = $CollisionShape2D
@onready var body_sprite: Sprite2D = $BodySprite
@onready var animation_player: AnimationPlayer = $AnimationPlayer


var direction: Vector2 = Vector2.RIGHT

func _physics_process(delta):
	var input_direction := Input.get_vector("turn_left","turn_right","move_backward","move_forward")
	if input_direction.x != 0:
		# Rotate direction based on our input and apply turn speed
		direction = direction.rotated(input_direction.x * (PI/2) * TURN_SPEED * delta)
		rotation = direction.angle()
	if input_direction.y != 0:
		# Move in a forward or backward motion and play animation
		animation_player.play("Move")
		velocity = lerp(velocity, (direction.normalized() * input_direction.y) * SPEED, SPEED * delta)
	else:
		# Bring to a stop
		velocity = Vector2.ZERO
		animation_player.play("Idle")

	# Apply our movement velocity
	move_and_slide()
	
func _input(event):
	pass
	
