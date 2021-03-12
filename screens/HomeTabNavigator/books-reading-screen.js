import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import colors from "../../assets/colors";
import ListItem from "../../components/list-item";
import { useSelector } from "react-redux";
import ListEmptyComponent from "../../components/list-empty-component";

export default function BooksReadingScreen() {
  const { isLoadingBooks, booksReading } = useSelector(state => state.books);

  return (
    <View style={styles.container}>
      {isLoadingBooks && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            elevation: 1000
          }}
        >
          <ActivityIndicator size="large" color={colors.logoColor} />
        </View>
      )}
      <FlatList
        data={booksReading}
        renderItem={({ item }, index) => <ListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          !isLoadingBooks && <ListEmptyComponent text="Not Reading Any Books" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center"
  },
  listEmptyComponentText: {
    fontWeight: "bold"
  }
});