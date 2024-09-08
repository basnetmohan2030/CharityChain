import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Navbar, Button, Card } from 'react-daisyui';
import Logo from '../assets/images/charitychain-logo2.png';
import LogoHero from '../assets/images/charitychain-logo.png';
import OrgNavbar from '../components/OrgNavbar';

const OrgCampaignDetail = () => {
  const chartRef = useRef();

  const campaign = {
    id: 1,
      title: "Clean Water for Rural Nepal",
      description: "Help us provide clean and safe drinking water to remote villages in Nepal. Many communities lack access to basic water facilities, and your donation can make a difference by building wells and water filtration systems.",
      goalAmount: "500,000 NPR",
      thresholdAmount: "400,000 NPR",
      raisedAmount: "120,000 NPR",
      image: "https://vajraadventure.com/storage/blog/drinking-water-in-nepal.jpg"
  };

  const donationTransactions = [
    { donor: 'Anish', amount: 5000, date: '2024-09-08' },
    { donor: 'Binayak', amount: 3000, date: '2024-09-08' },
    { donor: 'Mohan', amount: 1000, date: '2024-09-08' },
  ];

  const recipientTransactions = [
    { recipient: 'Recipient A', amount: 4500, date: '2024-09-08' },
    { recipient: 'Recipient B', amount: 4500, date: '2024-09-08' },
  ];

  const data = {
    name: 'Clean Water for Rural Nepal', // Organization in the middle
    children: [
      {
        name: 'Donors',
        children: [
          { name: 'Anish', amountDonated: 5000 },
          { name: 'Binayak', amountDonated: 3000 },
          { name: 'Mohan', amountDonated: 1000 },
        ],
      },
      {
        name: 'Recipients',
        children: [
          { name: 'Furniture', amountReceived: 4500 },
          { name: 'Stationery', amountReceived: 4500 },
        ],
      },
    ],
  };

  useEffect(() => {
    createVerticalTreeDiagram();
  }, []);

  const createVerticalTreeDiagram = () => {
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 600;
    const height = 600;
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const treeLayout = d3.tree().size([width - 100, height - 200]);

    // Ensure that only nodes with children have a `children` property
    const root = d3.hierarchy(data, d => (d.children && d.children.length ? d.children : null));

    treeLayout(root);

    // Define a link function for drawing straight lines between nodes
    const link = d3
      .linkVertical()
      .x(d => d.x)
      .y(d => d.y);

    // Create links between nodes
    svg
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', link)
      .attr('fill', 'none')
      .attr('stroke', '#ccc');

    // Add nodes (Donors, Organization, Recipients)
    const node = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Circles for the nodes
    node
      .append('circle')
      .attr('r', 8)
      .attr('fill', d => (d.data.name === 'Helping Hands' ? '#cc0055' : '#00cc77'));

    // Labels for nodes (Donor Names, Recipient Names, Organization)
    node
      .append('text')
      .attr('dy', -10)
      .style('text-anchor', 'middle')
      .text(d => d.data.name);

    // Add donation and distribution amounts as labels on edges
    svg
      .selectAll('.link-label')
      .data(root.links())
      .enter()
      .append('text')
      .attr('class', 'link-label')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .attr('dy', -5)
      .attr('text-anchor', 'middle')
      .text(d => {
        if (d.source.data.name === 'Donors') {
          return `${d.target.data.amountDonated}`;
        }
        if (d.source.data.name === 'Recipients') {
          return `${d.target.data.amountReceived}`;
        }
        return '';
      });
  };

  return (
    <div>
      <OrgNavbar></OrgNavbar>
      <Card className="shadow-xl p-6 mb-6 secondary-bg mt-3">
        <div className="flex flex-wrap justify-between">
          {/* Campaign Image */}
          <div className="w-full md:w-1/3">
            <img src={campaign.image} alt={campaign.title} className="rounded-lg" />
          </div>
          {/* Campaign Info */}
          <div className="w-full md:w-2/3 pl-4">
            <h2 className="text-3xl font-bold mb-4">{campaign.title}</h2>
            <p className="text-lg mb-4">{campaign.description}</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">Goal Amount:</p>
                <p>{campaign.goalAmount}</p>
              </div>
              <div>
                <p className="font-semibold">Collected Amount:</p>
                <p>{campaign.raisedAmount}</p>
              </div>
              <div>
                <p className="font-semibold">Threshold Amount:</p>
                <p>{campaign.thresholdAmount}</p>
              </div>
            </div>
          </div>
        </div>
        <Button className='primary-btn mt-6'>Disburse Amount</Button>
      </Card>

      {/* Donation Transactions Section */}
      <Card className="shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Collected Donations</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donationTransactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.donor}</td>
                <td>{tx.amount} NPR</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Recipient Transactions Section */}
      <Card className="shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Distributed Amount</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recipientTransactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.recipient}</td>
                <td>{tx.amount} NPR</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      
      <Card className="shadow-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-center mb-4">Donation Flow Diagram</h2>
        <div className='container mx-auto max-w-screen-sm'>
            <div ref={chartRef}></div>
        </div>
      </Card>
    </div>
  );
};

export default OrgCampaignDetail;
