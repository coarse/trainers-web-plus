import { useState, useMemo } from "preact/hooks";
import Header from "./components/Header";
import OnboardingScreen from "./components/OnboardingScreen";
import Footer from "./components/Footer";
import StatCard from "./components/StatCard";
import SearchBar from "./components/SearchBar";
import FilterPills from "./components/FilterPills";
import SortSelect from "./components/SortSelect";
import { parseDateToComparable } from "./utils/datetime";
import EmptyState from "./components/EmptyState";
import EventCard from "./components/EventCard";
import { useEventsStorage } from "./utils/useEventsStorage";
import { BASE_URL } from "../../shared/data";

function App() {
  const { events, lastSynced, account, onboardingCompleted, clearData } =
    useEventsStorage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");

  const openUrl = async (url: string) => {
    try {
      await browser.tabs.create({ url });
    } catch (err) {
      console.error("Failed to open tab:", err);
    }
  };

  const handleOpenMyPage = (country: string) => {
    openUrl(`${BASE_URL}/${country}/mypage/`);
  };

  const eventList = Object.values(events);
  const enteredCount = useMemo(
    () => eventList.filter((e) => e.status === "entered").length,
    [eventList],
  );
  const electedCount = useMemo(
    () =>
      eventList.filter((e) => e.status === "elected" || e.status === "joined")
        .length,
    [eventList],
  );
  const declinedCount = useMemo(
    () =>
      eventList.filter((e) => e.status === "declined" || e.status === "waiting")
        .length,
    [eventList],
  );

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return eventList.filter((event) => {
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.place.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatus === "all" || event.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [eventList, searchQuery, selectedStatus]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (sortBy === "date-asc") {
        return parseDateToComparable(a.date) - parseDateToComparable(b.date);
      } else if (sortBy === "date-desc") {
        return parseDateToComparable(b.date) - parseDateToComparable(a.date);
      }
      return 0;
    });
  }, [filteredEvents, sortBy]);

  const showOnboarding = !account && !onboardingCompleted;

  if (showOnboarding) {
    return (
      <div className="flex flex-col h-150 max-h-150 overflow-hidden">
        <OnboardingScreen onOpenMyPage={handleOpenMyPage} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-150 max-h-150 overflow-hidden">
      <Header account={account} />

      <section className="grid grid-cols-3 gap-2.5 py-2 px-4">
        <StatCard
          label="Registered"
          value={enteredCount.toString()}
          subtitle="events"
        />
        <StatCard
          label="Elected"
          value={electedCount.toString()}
          subtitle="events"
        />
        <StatCard
          label="Declined"
          value={declinedCount.toString()}
          subtitle="events"
        />
      </section>

      <section className="flex flex-col gap-3 bg-[#efefef] py-3 px-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex items-center justify-between gap-2">
          <FilterPills
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
      </section>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <EventCard
              key={`${event.country}_${event.id}`}
              event={event}
              onViewDetails={openUrl}
            />
          ))
        ) : (
          <EmptyState query={searchQuery || undefined} />
        )}
      </div>

      <Footer
        lastSynced={lastSynced}
        eventCount={eventList.length}
        onClearData={clearData}
      />
    </div>
  );
}

export default App;
