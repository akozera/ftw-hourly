import React, { Component } from 'react';
import moment from 'moment';
const { v4: uuidv4 } = require('uuid');
import { object, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import { PrimaryButton } from '../../components';
import classNames from 'classnames';

import css from './BookingCleaningFormExtended.module.css';

class BookingCleaningFormExtended extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdditionalServicesChange = this.handleAdditionalServicesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    // this.setState({ [evt.target.name]: evt.target.value });
    this.props.enterFrequencyInfo(evt.target.value);
  }
  handleAdditionalServicesChange(evt) {
    this.props.processAdditionalServicesInfo(evt.target.name);
  }
  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    const {
      rootClassName,
      className,
      services,
      frequencies,
      selectedFrequency,
      additionalServices,
      availableListings,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const submitButtonClasses = classNames(css.submitButtonWrapper);

    return (
      <div className={classes}>
        <form onSubmit={this.handleSubmit} className={css.BookingCleaningFormChild}>
          <section className={css.step}>
            <p className={css.stepTitle}>
              <span className={css.stepTitleNumber}>1</span>
              <FormattedMessage id="BookingCleaningFormExtended.step1" />
            </p>
            <fieldset className={css.BookingCleaningFrequencySection}>
              {frequencies.map(elem => {
                return (
                  <input
                    className={
                      css.BookingCleaningFrequency +
                      (selectedFrequency === elem ? ' ' + css.ButtonSelected : '')
                    }
                    key={uuidv4()}
                    type="button"
                    id={'button' + elem}
                    name="frequency"
                    value={elem}
                    onClick={this.handleChange}
                  />
                );
              })}
            </fieldset>
          </section>
          <section className={css.step}>
            <p className={css.stepTitle}>
              <span className={css.stepTitleNumber}>2</span>
              <FormattedMessage id="BookingCleaningFormExtended.step2" />
            </p>

            <div className={css.BookingCleaningAddonsSection}>
              {Object.keys(additionalServices).map(elem => {
                return (
                  <input
                    className={
                      css.BookingCleaningAddon +
                      (additionalServices[elem] ? ' ' + css.ButtonSelected : '')
                    }
                    key={uuidv4()}
                    type="button"
                    id={'button' + elem}
                    name={elem}
                    value={elem}
                    onClick={this.handleAdditionalServicesChange}
                  />
                );
              })}
            </div>
          </section>
          <section className={css.step}>
            <p className={css.stepTitle}>
              <span className={css.stepTitleNumber}>3</span>
              <FormattedMessage id="BookingCleaningFormExtended.step3" />
            </p>
            <div>
              Available listings are:
              {availableListings.map(listing => {
                return (
                  <p key={listing.id.uuid}>
                    {listing.id.uuid}: {listing.attributes.title}
                  </p>
                );
              })}
            </div>
          </section>
          <section className={css.step}>
            <p className={css.stepTitle}>
              <span className={css.stepTitleNumber}>4</span>
              <FormattedMessage id="BookingCleaningFormExtended.step4" />
            </p>
          </section>

          <p className={css.smallPrint}>
            <FormattedMessage id="BookingCleaningForm.youWontBeChargedInfo" />
          </p>
          <div className={submitButtonClasses}>
            <PrimaryButton type="submit">
              <FormattedMessage id="BookingCleaningFormExtended.submit" />
            </PrimaryButton>
          </div>
        </form>
      </div>
    );
  }
}

BookingCleaningFormExtended.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  frequencies: ['Weekly', 'Bi-weekly', 'Monthly', 'One-time'],
  additionalServices: ['Fridge', 'Windows', 'Oven', 'Cabinets', 'Laundry'],
};

BookingCleaningFormExtended.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,
};

export default BookingCleaningFormExtended;
