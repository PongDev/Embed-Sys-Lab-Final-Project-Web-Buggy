/*setup
 * TIM4 channel1 input capture direct mode, prescaler = 80-1, counter period = 65535
 * in IOC set A0 to GPIO_Output
 * in USER CODE 2, write HAL_TIM_IC_Start_IT(&htim4, TIM_CHANNEL_1);
 *
 *
 *
*/

#ifndef ULTRASONIC_H_
#define ULTRASONIC_H
#include "main.h"
#define TRIG_PIN GPIO_PIN_0
#define TRIG_PORT GPIOA

TIM_HandleTypeDef htim4;
uint32_t IC_Val1 = 0;
uint32_t IC_Val2 = 0;
uint32_t Difference = 0;
uint8_t Is_First_Captured = 0;
extern uint8_t Distance  = 0;


void delay(uint16_t time){
	__HAL_TIM_SET_COUNTER(&htim4,0);
	while(__HAL_TIM_GET_COUNTER(&htim4)<time);
}

void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim)
{
	if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_1)
	{

		if (Is_First_Captured==0)
		{
			IC_Val1 = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_1);
			Is_First_Captured = 1;
			__HAL_TIM_SET_CAPTUREPOLARITY(htim, TIM_CHANNEL_1, TIM_INPUTCHANNELPOLARITY_FALLING);
		}
		else if (Is_First_Captured==1)
		{
			IC_Val2 = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_1);
			__HAL_TIM_SET_COUNTER(htim, 0);

			if (IC_Val2 >= IC_Val1)
			{
				Difference = IC_Val2-IC_Val1;
			}

			else if (IC_Val1 > IC_Val2)
			{
				Difference = (0xffff - IC_Val1) + IC_Val2;
			}

			Distance = Difference * .034/2;
			Is_First_Captured = 0;
			__HAL_TIM_SET_CAPTUREPOLARITY(htim, TIM_CHANNEL_1, TIM_INPUTCHANNELPOLARITY_RISING);
			__HAL_TIM_DISABLE_IT(&htim4, TIM_IT_CC1);
		}
	}
}
int ReadUltrasonic ()
{
	HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_SET);  // pull the TRIG pin HIGH
	delay(10);  // wait for 10 us
	HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_RESET);  // pull the TRIG pin low
	__HAL_TIM_ENABLE_IT(&htim4, TIM_IT_CC1);
	return Distance;
}


#endif

