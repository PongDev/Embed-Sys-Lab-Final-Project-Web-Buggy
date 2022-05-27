#ifndef MOTOR_H_
#define MOTOR_H_
#include "main.h"

#define motorB_pwn GPIO_PIN_1
#define motorB_dir GPIO_PIN_0
#define motorA_dir GPIO_PIN_8
#define pwnB_ccr TIM1->CCR1
#define pwnB_cnt TIM1->CNT
#define pwnA_ccr TIM3->CCR3
#define pwnA_cnt TIM3->CNT

void motorA(char c,int speed){
	switch(c){
		case 'f':
			HAL_GPIO_WritePin(GPIOC, motorA_dir, 1);
			pwnA_ccr=speed;
			pwnA_cnt=0;
			break;
		case 'b':
			HAL_GPIO_WritePin(GPIOC, motorA_dir, 0);
			pwnA_ccr=speed;
			pwnA_cnt=0;
			break;
		default :
			HAL_GPIO_WritePin(GPIOC, motorA_dir, 0);
			pwnA_ccr=0;
			pwnA_cnt=0;
	}
}
void motorB(char c,int speed){
	switch(c){
		case 'f':
			HAL_GPIO_WritePin(GPIOA, motorB_dir, 1);
			pwnB_ccr=speed;
			pwnB_cnt=0;
			break;
		case 'b':
			HAL_GPIO_WritePin(GPIOA, motorB_dir, 0);
			pwnB_ccr=speed;
			pwnB_cnt=0;
			break;
		default :
			HAL_GPIO_WritePin(GPIOA, motorB_dir, 0);
			pwnB_ccr=0;
			pwnB_cnt=0;
	}
}

#endif
