import React, { useState } from 'react';
import { Table, Typography, Spin, Alert, Select, Button, Modal } from 'antd';
import { useApi } from '../hooks/useApi';
import { raceAPI, raceResultAPI } from '../api/services';
import type { Race, RaceResult } from '../api/services';

const { Title } = Typography;
const { Option } = Select;

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear + 1; y >= 1950; y--) {
    years.push(y);
  }
  return years;
};

const RacesPage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const { data, loading, error } = useApi<Race[]>(() => raceAPI.getRacesByYear(selectedYear), [selectedYear]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [raceIdForResult, setRaceIdForResult] = useState<number | null>(null);

  // Fetch race results only when modal is open and raceIdForResult is set
  const { data: results, loading: resultsLoading, error: resultsError } = useApi<RaceResult[]>(
    raceIdForResult ? () => raceResultAPI.getRaceResults(raceIdForResult) : () => Promise.resolve({ data: [] }),
    [raceIdForResult, modalOpen]
  );

  const openRaceResultModal = (race: Race) => {
    setSelectedRace(race);
    setRaceIdForResult(race.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setRaceIdForResult(null);
    setSelectedRace(null);
  };

  return (
    <div>
      <Title level={2} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        Races
        <Select
          value={selectedYear}
          style={{ width: 120 }}
          onChange={setSelectedYear}
          showSearch
          optionFilterProp="children"
        >
          {getYearOptions().map(year => (
            <Option key={year} value={year}>{year}</Option>
          ))}
        </Select>
      </Title>
      {error && <Alert type="error" message="Error loading races" description={"Please login to view the data"} showIcon style={{ marginBottom: 16 }} />}
      <Table<Race>
        dataSource={data || []}
        loading={loading}
        rowKey="id"
        columns={[
          // { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: 'Country', dataIndex: 'country', key: 'country' },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toISOString().split('T')[0]
          },
          { title: 'Circuit', dataIndex: 'circuitName', key: 'circuitName' },
          {
            title: 'Race Result',
            key: 'raceResult',
            render: (_, record) => (
              <Button type="primary" onClick={() => openRaceResultModal(record)}>
                Race Result
              </Button>
            ),
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        title={selectedRace ? `Race Result: ${selectedRace.name}` : 'Race Result'}
        footer={null}
        width={900}
      >
        {resultsError && <Alert type="error" message="Error loading race results" description={resultsError} showIcon style={{ marginBottom: 16 }} />}
        <Table<RaceResult>
          dataSource={results || []}
          loading={resultsLoading}
          rowKey="id"
          columns={[
            { title: 'Position', dataIndex: 'position', key: 'position', width: 80 },
            { title: 'Driver', dataIndex: 'driverName', key: 'driverName' },
            { title: 'Team', dataIndex: 'teamName', key: 'teamName' },
            { title: 'Points', dataIndex: 'points', key: 'points', width: 80 },
            { title: 'Grid', dataIndex: 'gridPosition', key: 'gridPosition', width: 80 },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            { title: 'Laps', dataIndex: 'lapsCompleted', key: 'lapsCompleted', width: 80 },
            { title: 'Fastest Lap', dataIndex: 'fastestLap', key: 'fastestLap', width: 100, render: (value) => value === true ? 'Yes' : 'No' },
            { title: 'Pit Stops', dataIndex: 'pitStops', key: 'pitStops', width: 100 },
          ]}
          pagination={{ pageSize: 10 }}
        />
      </Modal>
    </div>
  );
};

export default RacesPage; 