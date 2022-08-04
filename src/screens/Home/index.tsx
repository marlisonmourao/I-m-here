import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { Participant } from "../components/Participant";

import { styles } from "./styles";

export default function Home() {
  const [participant, setParticipant] = useState<string[]>([]);
  const [addParticipant, setAddParticipant] = useState('');

  function handleParticipantAdd() {
    if (participant.includes(addParticipant)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com esse nome"
      );

    }

    setParticipant((prevState) => [...prevState, addParticipant]);
    setAddParticipant('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name} ?`, [
      {
        text: "Sim",
        onPress: () => setParticipant(prevState => prevState.filter(participant => participant !== name)),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Nome do evento</Text>
      <Text style={styles.text2}> Sexta, 22 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setAddParticipant}
          value={addParticipant}

        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participant}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda ? {"\n"}
            Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}
