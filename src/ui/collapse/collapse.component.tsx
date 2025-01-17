import * as React from 'react';
import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { isFunction } from '../../utilities';

import { Div } from '../div/div.component';
import { CollapseBody } from './collapse.body.component';
import { CollapseHeader } from './collapse.header.component';
import { CollapseProps, CompoundedCollapse } from './collapse.type';
import { CollapseGroup } from './group.component';

const Collapse: CompoundedCollapse<CollapseProps> = (props) => {
  const { children, defaultActive, active, onChange, id, ...rest } = props;
  const [isActive, setIsActive] = useState(active || defaultActive);
  let header = null;
  let body = null;

  useEffect(() => {
    if ('active' in props) {
      setIsActive(props.active);
    }
  }, [props]);

  const changeState = (newState: boolean) => {
    setIsActive(newState);

    if (isFunction(onChange)) {
      onChange(id);
    }
  };

  React.Children.forEach(children, (child) => {
    // @ts-ignore
    if (child.type === CollapseHeader) {
      header = child;
      // @ts-ignore
    } else if (child.type === CollapseBody) {
      body = child;
    }
  });

  if (header === null) {
    throw Error(
      "header wasn't found to be rendered. Please make sure you have wrapped an Collapse.Header in the Collapse Component."
    );
  }

  header = React.cloneElement(header, {
    isActive,

    onPress: () => {
      changeState(!isActive);
    },
  });

  return (
    <Div {...rest}>
      {header}
      {!!body && React.cloneElement(body, { expanded: !isActive })}
    </Div>
  );
};

Collapse.defaultProps = {
  bg: 'white',
  flexDir: 'column',
  flexWrap: 'nowrap',
  rounded: 'md',
  overflow: 'hidden',
  shadow: 'none',
  mt: 'md',
  shadowColor: 'gray900',
  position: 'relative',
  bgMode: 'cover',
  pointerEvents: 'auto',
  row: false,
  borderStyle: 'solid',
  defaultActive: false,
};

Collapse.Body = CollapseBody;
Collapse.Header = CollapseHeader;
Collapse.Group = CollapseGroup;

export { Collapse };
