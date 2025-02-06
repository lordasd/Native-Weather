import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Location } from '@/src/app/(tabs)/(home)/index';
import { GEOAPIFY_KEY } from '@/src/constants/keys';

type CustomDrawerContentProps = DrawerContentComponentProps & {
    locations: Location[];
    setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
};

type Feature = {
    properties: {
        formatted: string;
        name: string;
        country: string;
        state?: string;
        city?: string;
        [key: string]: any;
    };
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
    const { locations, setLocations, ...rest } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchResults, setSearchResults] = useState<Feature[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const searchLocations = async (query: string) => {
        if (query.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setError(null);

        if (abortControllerRef.current)
            abortControllerRef.current.abort();

        const controller = new AbortController();
        abortControllerRef.current = controller;
        const isMounted = { current: true };

        try {
            const encodedQuery = encodeURIComponent(query);
            const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedQuery}&apiKey=${GEOAPIFY_KEY}&limit=5`;

            const response = await fetch(url, { signal: controller.signal });
            const data = await response.json();

            if (isMounted.current) {
                if (data.features) {
                    setSearchResults(data.features);
                } else {
                    setError('No locations found');
                }
            }
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') {
                return; // Ignore aborted request
            }
            if (isMounted.current) {
                setError('Failed to search locations');
                console.error('Search error:', err);
            }
        } finally {
            if (isMounted.current)
                setIsSearching(false);
        }

        return () => {
            isMounted.current = false; // Prevent state update if unmounted
        };
    };

    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            void searchLocations(searchQuery);
        }, 500); // Reduced debounce time for better responsiveness

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;  // Reset after aborting
            }
        };
    }, [searchQuery]);

    const formatLocationName = (feature: Feature): string => {
        const { name, city, state, country } = feature.properties;
        const parts = [name];

        if (city && city !== name) parts.push(city);
        if (state) parts.push(state);
        if (country) parts.push(country);

        return parts.join(', ');
    };

    const handleSuggestionPress = (feature: Feature) => {
        const formattedLocation = formatLocationName(feature);
        setSelectedLocation(formattedLocation);
        setSearchQuery(formattedLocation);
        setSearchResults([]);
    };

    const addLocation = () => {
        if (selectedLocation.trim()) {
            const newLoc = {
                name: selectedLocation.trim(),
                address: selectedLocation.trim()
            };

            // Check for duplicates
            if (!locations.some(loc => loc.name === newLoc.name)) {
                setLocations([...locations, newLoc]);
                resetModal();
            } else
                setError('This location is already in your list');
        }
    };

    const resetModal = () => {
        setModalVisible(false);
        setSearchQuery('');
        setSelectedLocation('');
        setSearchResults([]);
        setError(null);
    };

    const removeLocation = (name: string) => {
        if (name !== 'My Location') {
            setLocations(locations.filter(loc => loc.name !== name));
        }
    };

    return (
        <DrawerContentScrollView {...rest}>
            <DrawerItemList {...rest} />
            <View style={styles.container}>
                <Button title="Add Location" onPress={() => setModalVisible(true)} />
                {locations.map(loc =>
                    loc.name !== 'My Location' && (
                        <View key={loc.name} style={styles.locationItem}>
                            <Text style={styles.locationName}>{loc.name}</Text>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeLocation(loc.name)}
                            >
                                <Text style={styles.removeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    )
                )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={resetModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add a new location</Text>
                        <TextInput
                            placeholder="Search for a location..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.input}
                            autoFocus
                        />

                        {isSearching && (
                            <ActivityIndicator style={styles.loadingIndicator} />
                        )}

                        {error && (
                            <Text style={styles.errorText}>{error}</Text>
                        )}

                        {searchResults.length > 0 && (
                            <FlatList
                                style={styles.dropdown}
                                data={searchResults}
                                keyExtractor={(item, index) => index.toString()}
                                keyboardShouldPersistTaps="handled"
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.suggestionItem}
                                        onPress={() => handleSuggestionPress(item)}
                                    >
                                        <Text style={styles.suggestionText}>
                                            {formatLocationName(item)}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={resetModal}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.addButton,
                                    !selectedLocation && styles.buttonDisabled
                                ]}
                                onPress={addLocation}
                                disabled={!selectedLocation}
                            >
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    locationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    locationName: {
        flex: 1,
        fontSize: 16,
    },
    removeButton: {
        padding: 8,
    },
    removeButtonText: {
        color: '#ff4444',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },
    loadingIndicator: {
        marginVertical: 8,
    },
    errorText: {
        color: '#ff4444',
        marginBottom: 8,
        textAlign: 'center',
    },
    dropdown: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    suggestionText: {
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: '#666',
    },
    addButton: {
        backgroundColor: '#007AFF',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});

export default CustomDrawerContent;