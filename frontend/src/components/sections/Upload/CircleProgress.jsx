import React, { Component } from 'react';
import $ from 'jquery';

class CircleProgress extends Component {
    componentDidMount() {
        //initialize datatable
        function animateRoundedProgress(rpb) {
            if (!$(rpb).hasClass('animated')) {
                $(rpb).css('stroke-dashoffset', 358.141563 - (358.141563 / 100) * $(rpb).attr('aria-valuenow'));
                $(rpb).addClass('animated');
            }
        }
        function initRoundedProgress() {
            var roundedProgress = $('.progress-cicle');
            roundedProgress.each(function () {
                animateRoundedProgress(this);
            });
        }
        initRoundedProgress()
    }
    render() {
        return (
        <div className="col-md-6">

            <div className="progress-rounded progress-round-tiny">
                <div className="progress-value">{this.props.progress}%</div>
                <svg>
                    <circle className="progress-cicle bg-info" cx={65} cy={65} r={57} strokeWidth={16} fill="none" aria-valuenow={this.props.progress} aria-orientation="vertical" aria-valuemin={0} aria-valuemax={100} role="slider">
                    </circle>
                </svg>
            </div>
        </div>
        );
    }
}

export default CircleProgress;