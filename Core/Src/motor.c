
/*setup
  HCLK 80 MHz
  set Timer 1 and 3 ch 1,2 to PWM generation
  prescaler = 8000 - 1
  counter period = 100

  put these in user code 2
  HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
  HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_2);
  HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
  HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_2);

 */
#ifndef MOTOR_H_
#define MOTOR_H_
#include "main.h"

#define pwnB_ccrA TIM1->CCR1
#define pwnB_ccrB TIM1->CCR2
#define pwnB_cnt TIM1->CNT

#define pwnA_ccrA TIM3->CCR1
#define pwnA_ccrB TIM3->CCR2
#define pwnA_cnt TIM3->CNT
void motorA(char c,int speed){
	switch(c){
		case 'f':
			pwnA_ccrA = speed;
			pwnA_ccrB = 0;
			pwnA_cnt=0;
			break;
		case 'b':
			pwnA_ccrA = 0;
			pwnA_ccrB = speed;
			pwnA_cnt=0;
			break;
		default :
			pwnA_ccrA = 0;
			pwnA_ccrB = 0;
			pwnA_cnt=0;
	}
}
void motorB(char c,int speed){
	switch(c){
		case 'f':
			pwnB_ccrA = speed;
			pwnB_ccrB = 0;
			pwnB_cnt=0;
			break;
		case 'b':
			pwnB_ccrA = 0;
			pwnB_ccrB = speed;
			pwnB_cnt=0;
			break;
		default :
			pwnB_ccrA = 0;
			pwnB_ccrB = 0;
			pwnB_cnt=0;
	}
}
void forward(){
	motorA('f',100);
	motorB('f',100);
}
void backward(){
	motorA('b',100);
	motorB('b',100);
}
void left(){
	motorA('f',50);
	motorB('b',50);
}
void right(){
	motorA('b',50);
	motorB('f',50);
}
void stop(){
	motorA('o',0);
	motorB('o',0);
}
#endif
