import React, { useState, useEffect } from 'react'
import { MdTimeline } from 'react-icons/md'
import { GiProgression } from 'react-icons/gi'
import { FaUsers } from 'react-icons/fa'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from '../../axios'
import _ from 'lodash'

export default function Main() {

    const [analytics, setAnalytics] = useState({})


    useEffect(() => {
        const getAnalytics = async () => {
            const { data } = await axios.get('/analytics')
            setAnalytics(data)
        }


        getAnalytics()
    }, [])


    Chart.register(...registerables)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
    };
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Months Earnings',
                data: analytics.months,
                backgroundColor: _.times(12, () => {
                    var o = Math.round, r = Math.random, s = 255;
                    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.6 + ')';
                }),
            }
        ],
    };

    if (!analytics) return <p>Loading ...</p>


    return (
        <div>
            <div className='row'>
                <div className="col-sm-6 col-lg-4 mb-3">
                    <div className="card card-success">
                        <div className="card-header text-white" style={{ background: '#5bc0de' }} >
                            This Month
                        </div>
                        <div className='card-body card_bdy'>
                            <MdTimeline size={25} />
                            <h5>${analytics.this_month}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-3">
                    <div className="card card-success">
                        <div className="card-header text-white" style={{ background: '#5cb85c' }} >
                            This Year
                        </div>
                        <div className="card-body card_bdy">
                            <GiProgression size={25} />
                            <h5>${analytics.this_year}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-3">
                    <div className="card card-success">
                        <div className="card-header text-white" style={{ background: '#f0ad4e' }} >
                            Total Users
                        </div>
                        <div className="card-body card_bdy">
                            <FaUsers size={25} />
                            <h5>{analytics.total_users}</h5>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-3">
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}