import React, { Fragment, useState, Ref, useEffect } from 'react';

interface Props {
  name: string;
  rules?: { [rule: string]: string | number | boolean };
  // @ts-ignore
  register;
}

export default function InputComponent({ name, register, rules }: Props) {
  const ref = rules ? register(rules) : register;
  return <input type="text" name={name} ref={ref}></input>;
}
