'use client'
import React, {useEffect, useState} from 'react';
import styles from "./graph.module.css";

export default function Graph({data}) {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [isOpen, setOpen] = useState(false);
    const [dataXAxisKey, setDataXAxisKey] = useState(0);
    const period = "За последни" + (selectedPeriod === 'year' ? "й год" : selectedPeriod === 'half_year' ? "е полгода" : "й месяц");
    const periods = data?.finance.periods[0].graph;
    const periodOptions = Object.keys(periods).filter(item => item !== selectedPeriod);
    const minValue = 0;
    const maxValue = Math.max(...Object.values(periods[selectedPeriod]));
    const degree = String(maxValue).length - 2;
    const ceilMaxValue = (Math.ceil(maxValue / (10 ** degree))) * (10 ** degree);

    if (!periods) {
        return null;
    }

    const handleOpenOptions = () => {
        setOpen((prev) => !prev);
    }

    const onOptionClicked = (value) => {
        setSelectedPeriod(value);
        setOpen(false);
        setDataXAxisKey((prevKey) => prevKey + 1);
    };

    return (
        <div className={styles.graph}>
            <div className={styles.container}>
                <div className={styles.select}>
                    <div>{period}</div>
                    <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className={isOpen ? styles.svgRotate : styles.svg} onClick={handleOpenOptions}>
                        <path d="M26 2L14 14L2 2" stroke="#000AFF" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </div>
                {isOpen && (
                    <ul className={styles.options}>
                        {periodOptions.map((item) => (
                            <li key={item} className={styles.option} onClick={() => onOptionClicked(item)}>
                                {item === 'year' ? 'За последний год' :
                                    item === 'half_year' ? 'За последние полгода' :
                                        item === 'month' ? 'За последний месяц' : item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.chart}>
                    <div className={styles.yaxis}>
                        <div>{minValue}</div>
                        <div>{ceilMaxValue ? (ceilMaxValue / 20) : 500}</div>
                        <div>{ceilMaxValue ? (ceilMaxValue / 10) : 1000}</div>
                        <div>{ceilMaxValue ? (ceilMaxValue / 5) : 2000}</div>
                        <div>{ceilMaxValue ? (ceilMaxValue / 2) : 5000}</div>
                        <div>{ceilMaxValue ? ceilMaxValue : 10000}</div>
                    </div>
                    <div className={styles.datawrapper}>
                        <div className={styles.xaxis}>
                            {Object.keys(periods[selectedPeriod]).map((period) => (
                                <div style={{width: 100 / (Object.keys(periods[selectedPeriod]).length) + "%"}}
                                     key={period}>
                                    {period.length <= 5 ? period : period.substring(0, 3)}
                                </div>
                            ))}
                        </div>
                        <div className={styles.dataxaxis} key={dataXAxisKey}>
                            {Object.values(periods[selectedPeriod]).map((value, index) => (
                                <div className={styles.bar}
                                     style={{
                                         height: (value / ceilMaxValue) * 100 + "%"
                                     }}
                                     key={index}>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};