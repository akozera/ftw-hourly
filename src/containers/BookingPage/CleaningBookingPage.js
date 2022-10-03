import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faCalendar, faRotate, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faHouse,
  faCalendar,
  faRotate,
  faCircleCheck,
  faRibbon,
  faClipboardCheck,
  faSprayCanSparkles,
} from '@fortawesome/free-solid-svg-icons';
import { BookingCleaningForm, BookingCleaningFormExtended } from '../../forms';
import { FormattedMessage } from '../../util/reactIntl';
import { formatStartTimestampForSearch } from '../../util/dates';
import { calculateCleaningTimeMinutes, calculateCleaningTimeHours } from '../../util/abFunctions';

import StaticPage from '../../containers/StaticPage/StaticPage';

import css from './CleaningBookingPage.module.css';

class CleaningBookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialStage: true,
      initialInfo: {
        numBedrooms: '',
        numBathrooms: '',
        date: moment(new Date())
          .add(1, 'd')
          .format('YYYY-MM-DD'),
        time: '08:00',
        postcode: '',
        email: '',
      },
      frequency: 'Bi-weekly',
      additionalServices: {
        fridge: false,
        windows: false,
        oven: false,
        cabinets: false,
        laundry: false,
      },
      cleaningTimeEstimate: 0,
    };
    this.processInitialInfo = this.processInitialInfo.bind(this);
    this.enterFrequencyInfo = this.enterFrequencyInfo.bind(this);
    this.enterAdditionalServicesInfo = this.enterAdditionalServicesInfo.bind(this);
  }

  processInitialInfo(infoFromStep1) {
    this.setState({ initialInfo: infoFromStep1, initialStage: false });

    //Calculate the cleaning time
    let cleaningTimeEstimate = calculateCleaningTimeMinutes(
      infoFromStep1.numBedrooms,
      infoFromStep1.numBathrooms,
      this.state.additionalServices
    );
    console.log('CLEANING EST IS');
    console.log(cleaningTimeEstimate);
    this.setState({ cleaningTimeEstimate: cleaningTimeEstimate });
    return cleaningTimeEstimate;
  }

  enterFrequencyInfo(freq) {
    this.setState({ frequency: freq });
  }

  enterAdditionalServicesInfo(item) {
    let newAdditionalServices = {
      ...this.state.additionalServices,
      [item]: !this.state.additionalServices[[item]],
    };
    this.setState({
      additionalServices: newAdditionalServices,
    });
    //Calculate the cleaning time
    let cleaningTimeEstimate = calculateCleaningTimeMinutes(
      this.state.initialInfo.numBedrooms,
      this.state.initialInfo.numBathrooms,
      newAdditionalServices
    );
    console.log('CLEANING EST ADD SERVICES IS');
    console.log(cleaningTimeEstimate);
    this.setState({ cleaningTimeEstimate: cleaningTimeEstimate });

    console.log('Search listings ADD SERVICES');
    this.props
      .onBookingSearchListings({
        // perPage: 100,
        startTime: formatStartTimestampForSearch(
          this.state.initialInfo.date,
          this.state.initialInfo.time
        ),
        minDuration: cleaningTimeEstimate,
      })
      .then(data => console.log(data));
  }

  render() {
    return (
      <StaticPage
        className={css.root}
        title="Book a Cleaning Hero"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'CleaningBookingPage',
          description: 'Page to book cleaning services',
          name: 'Cleaning booking page',
        }}
      >
        {this.state.initialStage ? (
          <div className={css.heroContainer}>
            <div className={css.heroContent}>
              <BookingCleaningForm
                onBookingSearchListings={this.props.onBookingSearchListings}
                onBookingSearchAllListings={this.props.onBookingSearchAllListings}
                processInitialInfo={this.processInitialInfo}
                cleaningTimeEstimate={this.state.cleaningTimeEstimate}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className={css.CleaningBookingPageMain}>
              <BookingCleaningFormExtended
                selectedFrequency={this.state.frequency}
                enterFrequencyInfo={this.enterFrequencyInfo}
                additionalServices={this.state.additionalServices}
                enterAdditionalServicesInfo={this.enterAdditionalServicesInfo}
                availableListings={this.props.availableListings}
              />
            </div>
            <div className={css.CleaningBookingPageRightPanel}>
              <div className={css.CleaningBookingPageSummary}>
                <h4>Booking Summary</h4>
                <div>
                  <p>
                    <FontAwesomeIcon icon={faHouse} /> Home Cleaning{' '}
                  </p>
                  <p id="cleaningBookingPageSmallDetails">
                    {this.state.initialInfo.numBedrooms || 0} bed,
                    {' ' + this.state.initialInfo.numBathrooms || 0} bath
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCalendar} /> {this.state.initialInfo.date},{' '}
                  {this.state.initialInfo.time} <br></br>
                  {calculateCleaningTimeHours(this.state.cleaningTimeEstimate)} hours
                </div>
                <div>
                  <FontAwesomeIcon icon={faRotate} /> {this.state.frequency}
                </div>
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} /> Cancel Anytime
                </div>
                <div>
                  <p>Per Cleaning</p>
                  <span></span>
                  <p>Hero Service Fee</p>
                  <span></span>
                </div>
                <hr />
                <div>
                  <p>Today's Total</p>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={css.CleaningBookingPageAdditionalInfo}>
                <p>
                  <FontAwesomeIcon icon={faRibbon} /> Quality Guarantee
                </p>
                <p>
                  <FontAwesomeIcon icon={faClipboardCheck} /> Pre-screened Cleaner
                </p>
                <p>
                  <FontAwesomeIcon icon={faSprayCanSparkles} /> Supplies Included
                </p>
              </div>
            </div>
          </div>
        )}

        <h2>
          <FormattedMessage id="CleaningBookingPage.title" />
        </h2>
        <h3>
          <FormattedMessage id="CleaningBookingPage.subTitle" />
        </h3>
      </StaticPage>
    );
  }
}

export default CleaningBookingPage;
