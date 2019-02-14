import React from 'react';
import { shallow } from 'enzyme';
import ProductsList from './ProductsList';

it('renders without crashing', () => {
  shallow(<ProductsList products={['coucou']} />);
});

describe('get products values', () => {
  it('get values from redux', () => {
    const wrapper = shallow(<ProductsList products={['coucou']} />).dive();
    console.log(wrapper.props());
  });
});
