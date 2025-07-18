import React, { useState } from 'react';
import { Table, Typography, Alert, Select } from 'antd';
import { useApi } from '../hooks/useApi';
import { raceAPI, raceResultAPI } from '../api/services';
import type { Race, RaceResult } from '../api/services';

const { Title } = Typography;
const CURRENT_YEAR = new Date().getFullYear();

const ResultsPage: React.FC = () => {
  const { data: races, loading: racesLoading, error: racesError } = useApi<Race[]>(() => raceAPI.getRacesByYear(CURRENT_YEAR));
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);
  const { data: results, loading: resultsLoading, error: resultsError } = useApi<RaceResult[]>(
    selectedRaceId ? () => raceResultAPI.getRaceResults(selectedRaceId) : () => Promise.resolve({ data: [] }),
    [selectedRaceId]
  );

  return (
    <div>
      <Title level={2}>Race Results</Title>
      {racesError && <Alert type="error" message="Error loading races" description={racesError} showIcon style={{ marginBottom: 16 }} />}
      <Select
        showSearch
        placeholder="Select a race"
        style={{ width: 300, marginBottom: 16 }}
        loading={racesLoading}
        onChange={value => setSelectedRaceId(Number(value))}
      >
        {races?.map(race => (
          <Select.Option key={race.id} value={race.id.toString()}>{race.name} ({race.date})</Select.Option>
        ))}
      </Select>
      {resultsError && <Alert type="error" message="Error loading results" description={resultsError} showIcon style={{ marginBottom: 16 }} />}
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
          { title: 'Fastest Lap', dataIndex: 'fastestLap', key: 'fastestLap', width: 100 },
          { title: 'Pit Stops', dataIndex: 'pitStops', key: 'pitStops', width: 100 },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ResultsPage; 