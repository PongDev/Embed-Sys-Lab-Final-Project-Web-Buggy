#ifndef ULTRASONIC_H_
#define ULTRASONIC_H

void delay(uint16_t time);
void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim);
int ReadUltrasonic ();
#endif
