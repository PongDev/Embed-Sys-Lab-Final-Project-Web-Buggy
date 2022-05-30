/*setup
 HCLK 80 MHz
 set Timer 1 and 3 ch 1,2 to PWM generation
 prescaler = 8000 - 1
 counter period = 100

 put these in user code 2
 HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
 HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_4);
 HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
 HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_2);

 */
#ifndef MOTOR_H_
#define MOTOR_H_
#include "main.h"

#define pwnB_ccrA TIM1->CCR1
#define pwnB_ccrB TIM1->CCR4
#define pwnB_cnt TIM1->CNT

#define pwnA_ccrA TIM3->CCR1
#define pwnA_ccrB TIM3->CCR2
#define pwnA_cnt TIM3->CNT

static char motorDirection = 0;
static int speed = 0;

void motor() {
	switch (motorDirection) {
	case 'w':
		pwnA_ccrA = speed;
		pwnA_ccrB = 0;
		pwnA_cnt = 0;
		pwnB_ccrA = speed;
		pwnB_ccrB = 0;
		pwnB_cnt = 0;
		break;
	case 'a':
		pwnA_ccrA = speed;
		pwnA_ccrB = 0;
		pwnA_cnt = 0;
		pwnB_ccrA = 0;
		pwnB_ccrB = speed;
		pwnB_cnt = 0;
		break;
	case 's':
		pwnA_ccrA = 0;
		pwnA_ccrB = speed;
		pwnA_cnt = 0;
		pwnB_ccrA = 0;
		pwnB_ccrB = speed;
		pwnB_cnt = 0;
		break;
	case 'd':
		pwnA_ccrA = 0;
		pwnA_ccrB = speed;
		pwnA_cnt = 0;
		pwnB_ccrA = speed;
		pwnB_ccrB = 0;
		pwnB_cnt = 0;
		break;
	default:
		pwnA_ccrA = 0;
		pwnA_ccrB = 0;
		pwnA_cnt = 0;
		pwnB_ccrA = 0;
		pwnB_ccrB = 0;
		pwnB_cnt = 0;
		break;
	}
}

void setMotor(char dir) {
	if (dir == motorDirection) {
		speed += 10;
		if ((motorDirection == 'w' || motorDirection == 's') && (speed > 100))
			speed = 100;
		else if (motorDirection == 'a' || motorDirection == 'd')
			speed = 50;
	} else {
		speed = 0;
	}
	motorDirection = dir;
	motor();
}

#endif
