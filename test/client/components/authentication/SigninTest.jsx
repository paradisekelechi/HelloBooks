import expect from 'expect';
import React from 'react';
import {
  shallow,
  mount
} from 'enzyme';
import Signin from '../../../../client/components/authentication/Signin';


const setup = () => {
  return shallow(<Signin />);
};

it('renders h5 as part of the elements', () => {
  const wrapper = setup();
  expect(wrapper.find('h5'));
});
