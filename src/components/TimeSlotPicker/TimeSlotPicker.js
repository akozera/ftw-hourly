import React, { Component } from 'react';
import moment from 'moment';
const { v4: uuidv4 } = require('uuid');
import { bool, node, string } from 'prop-types';
import classNames from 'classnames';

import css from './TimeSlotPicker.module.css';

class TimeSlotPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, rootClassName, startDate, ...rest } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className, {
      //   [css.ready]: ready,
      //   [css.inProgress]: inProgress,
    });

    return (
      <div className={classes}>
        <TimeSlotPickerDays startDate={startDate} />
        <TimeSlotPickerHours />
      </div>
    );
  }
}

export class TimeSlotPickerDays extends Component {
  render() {
    const { startDate, numDays } = this.props;
    return (
      <div>
        {[...Array(numDays).keys()].map(elem => {
          return (
            <div key={uuidv4()}>
              {moment(new Date(startDate))
                .add(elem + 1, 'd')
                .format('ll')}
            </div>
          );
        })}
      </div>
    );
  }
}

export class TimeSlotPickerHours extends Component {
  render() {
    return <div>Times go here</div>;
  }
}

TimeSlotPicker.defaultProps = {
  rootClassName: null,
  className: null,
};

TimeSlotPicker.propTypes = {
  rootClassName: string,
  className: string,
};

TimeSlotPickerDays.defaultProps = {
  rootClassName: null,
  className: null,
  numDays: 7,
};

export default TimeSlotPicker;
